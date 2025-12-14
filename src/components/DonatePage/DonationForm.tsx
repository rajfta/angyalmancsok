import {
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { type FC, useEffect, useId, useMemo, useState } from "react";

const stripeKey = import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

// Slider configuration
const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 100000;
const STEP = 1000;
const DEFAULT_AMOUNT = 5000;

// Preset amount buttons
const PRESET_AMOUNTS = [2000, 5000, 10000, 25000];

// Impact calculation based on donation amount
const calculateImpact = (amount: number) => {
	// Cost estimates (in Ft)
	const TREAT_COST = 2000; // jutalomfalat per session
	const SESSION_COST = 15000; // one therapy session
	const HEALTH_CHECK_COST = 30000; // health screening per dog

	const treats = Math.floor(amount / TREAT_COST);
	const sessions = Math.floor(amount / SESSION_COST);
	const healthChecks = Math.floor(amount / HEALTH_CHECK_COST);

	return {
		treats,
		sessions,
		healthChecks,
	};
};

interface DonationFormInnerProps {
	amount: number;
	name: string;
	email: string;
}

const DonationFormInner: FC<DonationFormInnerProps> = ({
	amount,
	name,
	email,
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsProcessing(true);
		setErrorMessage(null);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/tamogatas?success=true&amount=${amount}`,
				payment_method_data: {
					billing_details: {
						name: name || undefined,
						email: email || undefined,
					},
				},
			},
		});

		if (error) {
			setErrorMessage(
				error.message || "Hiba történt a fizetés során. Kérjük, próbáld újra.",
			);
			setIsProcessing(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<p className="block text-sm font-semibold text-text-heading mb-2">
					Kártyaadatok <span className="text-red-500">*</span>
				</p>
				<PaymentElement
					options={{
						layout: "tabs",
					}}
				/>
			</div>

			{errorMessage && (
				<div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
					{errorMessage}
				</div>
			)}

			<button
				type="submit"
				disabled={!stripe || isProcessing}
				className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
			>
				{isProcessing ? (
					<>
						<Loader2 className="w-5 h-5 animate-spin" />
						Feldolgozás...
					</>
				) : (
					"Adományozok!"
				)}
			</button>
		</form>
	);
};

interface DonationFormProps {
	dogImage?: string;
}

const DonationForm: FC<DonationFormProps> = ({ dogImage }) => {
	const sliderId = useId();
	const nameId = useId();
	const emailId = useId();
	const [sliderAmount, setSliderAmount] = useState(DEFAULT_AMOUNT);
	const [isMonthly, setIsMonthly] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [clientSecret, setClientSecret] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [successAmount, setSuccessAmount] = useState<number | null>(null);

	// Check for success on mount
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (params.get("success") === "true") {
			setIsSuccess(true);
			const amt = params.get("amount");
			if (amt) setSuccessAmount(Number.parseInt(amt, 10));
		}
	}, []);

	const amount = sliderAmount;

	// Calculate impact based on current amount
	const impact = useMemo(() => calculateImpact(amount), [amount]);

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSliderAmount(Number.parseInt(e.target.value, 10));
		setClientSecret(null);
		setError(null);
	};

	// Calculate slider percentage for styling
	const sliderPercentage =
		((sliderAmount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;

	const handleProceedToPayment = async () => {
		if (!amount || amount < 200) {
			setError("Kérjük, adj meg legalább 200 Ft-ot.");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/create-payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ amount, name, email }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Hiba történt");
			}

			setClientSecret(data.clientSecret);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Hiba történt. Próbáld újra.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	// Show error if Stripe is not configured
	if (!stripePromise) {
		return (
			<div className="bg-red-50 rounded-2xl shadow-xl p-8 text-center">
				<h2 className="text-xl font-bold text-red-600 mb-4">
					Fizetési rendszer nem elérhető
				</h2>
				<p className="text-red-700">
					A fizetési rendszer jelenleg nem elérhető. Kérjük, próbálja később!
				</p>
			</div>
		);
	}

	if (isSuccess) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className="bg-white rounded-2xl shadow-xl p-8 text-center"
			>
				<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
					<CheckCircle className="w-10 h-10 text-green-600" />
				</div>
				<h2 className="text-2xl font-bold text-text-heading mb-4">
					Köszönjük az adományod!
				</h2>
				<p className="text-text-description mb-6">
					{successAmount && (
						<span className="block text-lg font-semibold text-primary-600 mb-2">
							{successAmount.toLocaleString("hu-HU")} Ft
						</span>
					)}
					Az adományod segít abban, hogy tovább folytathassuk munkánkat a
					terápiás kutyákkal. Hálásak vagyunk a támogatásodért!
				</p>
				<a
					href="/"
					className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
				>
					Vissza a főoldalra
				</a>
			</motion.div>
		);
	}

	return (
		<div className="grid lg:grid-cols-5 gap-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="lg:col-span-3 bg-bg-highlight rounded-2xl shadow-xl md:p-8 p-4"
			>
				<h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4">
					Azonnali adomány
				</h2>

				{/* Amount Slider */}
				<div className="mb-6">
					<div className="flex justify-between items-center mb-3">
						<label
							htmlFor={sliderId}
							className="block text-sm font-semibold text-text-heading"
						>
							Adomány összege
						</label>
						<span className="text-2xl font-bold text-primary-600">
							{sliderAmount.toLocaleString("hu-HU")} Ft
						</span>
					</div>

					{/* Preset Amount Buttons */}
					<div className="grid grid-cols-4 gap-2 mb-4">
						{PRESET_AMOUNTS.map((preset) => (
							<button
								key={preset}
								type="button"
								onClick={() => {
									setSliderAmount(preset);
									setClientSecret(null);
									setError(null);
								}}
								className={`py-3 px-2 rounded-lg font-semibold text-sm transition-all ${
									sliderAmount === preset
										? "bg-primary-500 text-white shadow-md"
										: "bg-white border border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50"
								}`}
							>
								{preset.toLocaleString("hu-HU")}
								<span className="hidden md:inline"> Ft</span>
							</button>
						))}
					</div>

					{/* Slider */}
					<div className="relative mb-2">
						<input
							id={sliderId}
							type="range"
							min={MIN_AMOUNT}
							max={MAX_AMOUNT}
							step={STEP}
							value={sliderAmount}
							onChange={handleSliderChange}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
							style={{
								background: `linear-gradient(to right, #81b3c9 0%, #81b3c9 ${sliderPercentage}%, #e5e7eb ${sliderPercentage}%, #e5e7eb 100%)`,
							}}
						/>
					</div>
					<div className="flex justify-between text-sm text-gray-500">
						<span>{MIN_AMOUNT.toLocaleString("hu-HU")} Ft</span>
						<span>{MAX_AMOUNT.toLocaleString("hu-HU")} Ft</span>
					</div>
				</div>

				{/* One-time / Monthly Toggle */}
				<div className="mb-6">
					<div className="flex rounded-lg border border-gray-200 overflow-hidden">
						<button
							type="button"
							onClick={() => setIsMonthly(false)}
							className={`flex-1 py-3 px-4 font-semibold transition-colors ${
								!isMonthly
									? "bg-primary-500 text-white"
									: "bg-white text-gray-600 hover:bg-gray-50"
							}`}
						>
							Egyszeri adomány
						</button>
						<button
							type="button"
							onClick={() => setIsMonthly(true)}
							className={`flex-1 py-3 px-4 font-semibold transition-colors ${
								isMonthly
									? "bg-primary-500 text-white"
									: "bg-white text-gray-600 hover:bg-gray-50"
							}`}
						>
							Havi támogatás
						</button>
					</div>
					{isMonthly && (
						<p className="mt-2 text-sm text-gray-500">
							Havonta automatikusan levonásra kerül a megadott összeg.
						</p>
					)}
				</div>

				{/* Impact Section */}
				<div className="mb-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
					<p className="text-sm text-text-heading mb-3">
						A te{" "}
						<span className="font-bold">
							{sliderAmount.toLocaleString("hu-HU")} Ft
						</span>
						-os
						{isMonthly ? " havi " : " "}adományod fedezi:
					</p>
					<div className="space-y-2">
						{impact.sessions > 0 && (
							<div className="flex justify-between">
								<span className="text-text-description">
									Terápiás foglalkozás
								</span>
								<span className="font-semibold text-primary-600">
									{impact.sessions} alkalom
								</span>
							</div>
						)}
						{impact.treats > 0 && (
							<div className="flex justify-between">
								<span className="text-text-description">
									Jutalomfalat csomag
								</span>
								<span className="font-semibold text-primary-600">
									{impact.treats} csomag
								</span>
							</div>
						)}
						{impact.healthChecks > 0 && (
							<div className="flex justify-between">
								<span className="text-text-description">
									Egészségügyi szűrés
								</span>
								<span className="font-semibold text-primary-600">
									{impact.healthChecks} kutya
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Name Field */}
				<div className="mb-4">
					<label
						htmlFor={nameId}
						className="block text-sm font-semibold text-text-heading mb-2"
					>
						Név
					</label>
					<input
						id={nameId}
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Név"
						className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>

				{/* Email Field */}
				<div className="mb-6">
					<label
						htmlFor={emailId}
						className="block text-sm font-semibold text-text-heading mb-2"
					>
						Email cím
					</label>
					<input
						id={emailId}
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email cím"
						className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>

				{error && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
						{error}
					</div>
				)}

				{/* Payment Section */}
				{clientSecret ? (
					<Elements
						stripe={stripePromise}
						options={{
							clientSecret,
							appearance: {
								theme: "stripe",
								variables: {
									colorPrimary: "#81b3c9",
								},
							},
							locale: "hu",
						}}
					>
						<DonationFormInner amount={amount || 0} name={name} email={email} />
					</Elements>
				) : (
					<button
						type="button"
						onClick={handleProceedToPayment}
						disabled={!amount || amount < 200 || isLoading}
						className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{isLoading ? (
							<>
								<Loader2 className="w-5 h-5 animate-spin" />
								Betöltés...
							</>
						) : (
							"Tovább a fizetéshez"
						)}
					</button>
				)}
			</motion.div>

			{/* Dog Image with Quote */}
			{dogImage && (
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="order-first lg:order-2 lg:col-span-2"
				>
					<div className="relative rounded-2xl shadow-xl overflow-hidden">
						<img
							src={dogImage}
							alt="Terápiás kutya"
							className="w-full h-auto object-cover"
						/>
						{/* Quote Overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
						<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
							<p className="text-lg md:text-xl font-medium leading-relaxed mb-3">
								"A terápiás kutyák látogatásai reményt adtak, amikor a leginkább
								szükségem volt rá. Ezek a programok életet változtatnak meg."
							</p>
							<p className="text-sm text-white/80">
								— Kovács M., Kórházi páciens
							</p>
						</div>
					</div>

					{/* Stripe Badge */}
					<div className="mt-4 p-4 bg-bg-highlight rounded-lg shadow-md">
						<div className="flex items-center gap-4 mb-2">
							<div className="flex flex-col">
								<span className="text-xs text-gray-500">
									Donations are powered by
								</span>
								<span className="text-xl font-bold text-[#635bff]">stripe</span>
							</div>
							<div className="flex items-center gap-2 ml-auto">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
									alt="Mastercard"
									className="h-8"
								/>
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
									alt="Visa"
									className="h-6"
								/>
							</div>
						</div>
						<p className="text-[10px] text-gray-500 leading-tight">
							Adományozzon bankkártyája segítségével biztonságos, titkosított
							kapcsolaton keresztül! A kártyaadatokat közvetlenül és kizárólag a
							Stripe rendszere kapja meg.
						</p>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default DonationForm;
