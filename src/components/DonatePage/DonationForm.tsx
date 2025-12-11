import {
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { type FC, useEffect, useState } from "react";

const stripePromise = loadStripe(
	import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const DONATION_AMOUNTS = [
	{ value: 1000, label: "1000 Ft" },
	{ value: 5000, label: "5000 Ft" },
	{ value: 25000, label: "25000 Ft" },
];

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
				<label className="block text-sm font-semibold text-text-heading mb-2">
					Kártyaadatok <span className="text-red-500">*</span>
				</label>
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
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	const [customAmount, setCustomAmount] = useState("");
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

	const amount =
		selectedAmount === -1
			? Number.parseInt(customAmount, 10) || 0
			: selectedAmount;

	const handleAmountSelect = (value: number) => {
		setSelectedAmount(value);
		if (value !== -1) {
			setCustomAmount("");
		}
		setClientSecret(null);
		setError(null);
	};

	const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomAmount(e.target.value);
		setClientSecret(null);
		setError(null);
	};

	const handleProceedToPayment = async () => {
		if (!amount || amount < 100) {
			setError("Kérjük, adj meg legalább 100 Ft-ot.");
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
				className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-8"
			>
				<h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4">
					Azonnali adomány
				</h2>
				<p className="text-text-description mb-6">
					Adományozzon bankkártyája segítségével biztonságos, titkosított
					kapcsolaton keresztül! A kártyaadatokat közvetlenül és kizárólag a
					Stripe rendszere kapja meg.
				</p>

				{/* Stripe Badge */}
				<div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
					<div className="flex flex-col">
						<span className="text-xs text-gray-500">Powered by</span>
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

				<p className="text-sm text-gray-500 mb-6">
					<span className="text-red-500">"*"</span> a kötelező mezőket jelöli
				</p>

				{/* Amount Selection */}
				<div className="mb-6">
					<label className="block text-sm font-semibold text-text-heading mb-3">
						Adomány összege <span className="text-red-500">*</span>
					</label>
					<div className="space-y-2">
						{DONATION_AMOUNTS.map((opt) => (
							<label
								key={opt.value}
								className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
									selectedAmount === opt.value
										? "border-primary-500 bg-primary-50"
										: "border-gray-200 hover:border-primary-300"
								}`}
							>
								<input
									type="radio"
									name="amount"
									value={opt.value}
									checked={selectedAmount === opt.value}
									onChange={() => handleAmountSelect(opt.value)}
									className="w-5 h-5 text-primary-500 focus:ring-primary-500"
								/>
								<span className="font-medium">{opt.label}</span>
							</label>
						))}
						<label
							className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
								selectedAmount === -1
									? "border-primary-500 bg-primary-50"
									: "border-gray-200 hover:border-primary-300"
							}`}
						>
							<input
								type="radio"
								name="amount"
								value="-1"
								checked={selectedAmount === -1}
								onChange={() => handleAmountSelect(-1)}
								className="w-5 h-5 text-primary-500 focus:ring-primary-500"
							/>
							<span className="font-medium">Egyéb összeg</span>
						</label>
					</div>

					{selectedAmount === -1 && (
						<div className="mt-3">
							<div className="relative">
								<input
									type="number"
									value={customAmount}
									onChange={handleCustomAmountChange}
									placeholder="Add meg az összeget"
									min="100"
									className="w-full p-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
								/>
								<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
									Ft
								</span>
							</div>
						</div>
					)}
				</div>

				{/* Name Field */}
				<div className="mb-4">
					<label className="block text-sm font-semibold text-text-heading mb-2">
						Név
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Név"
						className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>

				{/* Email Field */}
				<div className="mb-6">
					<label className="block text-sm font-semibold text-text-heading mb-2">
						Email cím
					</label>
					<input
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
						disabled={!amount || amount < 100 || isLoading}
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

			{/* Dog Image */}
			{dogImage && (
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="hidden lg:block lg:col-span-2"
				>
					<img
						src={dogImage}
						alt="Terápiás kutya"
						className="w-full h-auto rounded-2xl shadow-xl object-cover"
					/>
				</motion.div>
			)}
		</div>
	);
};

export default DonationForm;
