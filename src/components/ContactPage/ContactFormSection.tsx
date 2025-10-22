import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { type FC, type FormEvent, useState } from "react";

const ContactFormSection: FC = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitStatus("success");
			setFormData({ name: "", email: "", phone: "", message: "" });

			// Reset success message after 5 seconds
			setTimeout(() => setSubmitStatus("idle"), 5000);
		}, 1500);
	};

	return (
		<section
			id="kapcsolat-form"
			className="relative py-24 bg-gradient-to-b from-bg to-primary-50/30 overflow-hidden"
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 -z-10 opacity-5">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15 Q35 20, 30 25 Q25 20, 30 15 M20 25 Q22 28, 20 30 Q18 28, 20 25 M40 25 Q42 28, 40 30 Q38 28, 40 25 M30 30 Q32 35, 30 40 Q28 35, 30 30' fill='%2381b3c9' opacity='0.4'/%3E%3C/svg%3E")`,
						backgroundSize: "60px 60px",
					}}
				/>
			</div>

			<div className="container-padding max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<motion.div
						initial={{ scale: 0 }}
						whileInView={{ scale: 1 }}
						viewport={{ once: true }}
						transition={{
							type: "spring",
							stiffness: 200,
							damping: 15,
							delay: 0.2,
						}}
						className="inline-flex items-center gap-3 bg-primary-100 text-primary-700 px-6 py-3 rounded-full mb-6"
					>
						<Mail className="w-5 h-5" />
						<span className="font-semibold">Kapcsolat</span>
					</motion.div>

					<h2 className="text-3xl md:text-5xl font-bold text-primary-700 mb-4">
						Írj Nekünk!
					</h2>
					<p className="text-text-description text-lg max-w-2xl mx-auto">
						Kérdésed van, vagy szeretnél csatlakozni? Töltsd ki az űrlapot és
						hamarosan jelentkezünk!
					</p>
				</motion.div>

				{/* Contact Form Card */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="relative"
				>
					{/* Gradient Border Effect */}
					<div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-accent-400 to-secondary-400 rounded-2xl blur opacity-20" />

					<div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Name Field */}
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-semibold text-text-heading mb-2"
									>
										Név *
									</label>
									<input
										type="text"
										id="name"
										required
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
										placeholder="Teljes neved"
									/>
								</div>

								{/* Email Field */}
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-semibold text-text-heading mb-2"
									>
										Email cím *
									</label>
									<input
										type="email"
										id="email"
										required
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
										placeholder="pelda@email.hu"
									/>
								</div>
							</div>

							{/* Phone Field */}
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-semibold text-text-heading mb-2"
								>
									Telefonszám
								</label>
								<input
									type="tel"
									id="phone"
									value={formData.phone}
									onChange={(e) =>
										setFormData({ ...formData, phone: e.target.value })
									}
									className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
									placeholder="+36 30 123 4567"
								/>
							</div>

							{/* Message Field */}
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-semibold text-text-heading mb-2"
								>
									Üzenet *
								</label>
								<textarea
									id="message"
									required
									value={formData.message}
									onChange={(e) =>
										setFormData({ ...formData, message: e.target.value })
									}
									rows={6}
									className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none resize-none"
									placeholder="Írd meg, miben tudunk segíteni..."
								/>
							</div>

							{/* Submit Button */}
							<motion.button
								type="submit"
								disabled={isSubmitting}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? (
									<>
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										<span>Küldés...</span>
									</>
								) : (
									<>
										<Send className="w-5 h-5" />
										<span>Üzenet Küldése</span>
									</>
								)}
							</motion.button>

							{/* Success Message */}
							{submitStatus === "success" && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg text-center"
								>
									Köszönjük az üzeneted! Hamarosan keresünk!
								</motion.div>
							)}
						</form>
					</div>
				</motion.div>

				{/* Contact Info */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
				>
					{/* Phone */}
					<div className="flex items-center justify-center gap-4 bg-white rounded-xl p-6 shadow-md border border-gray-100">
						<div className="p-3 bg-primary-100 rounded-full">
							<Phone className="w-6 h-6 text-primary-600" />
						</div>
						<div>
							<p className="text-sm text-text-description mb-1">Hívj minket:</p>
							<a
								href="tel:+36301234567"
								className="text-lg font-semibold text-primary-700 hover:text-primary-800 transition-colors"
							>
								+36 30 123 4567
							</a>
						</div>
					</div>

					{/* Social Links */}
					<div className="flex items-center justify-center gap-4 bg-white rounded-xl p-6 shadow-md border border-gray-100">
						<div className="p-3 bg-accent-100 rounded-full">
							<Mail className="w-6 h-6 text-accent-600" />
						</div>
						<div>
							<p className="text-sm text-text-description mb-2">
								Kövess minket:
							</p>
							<div className="flex gap-3">
								<a
									href="https://www.instagram.com/angyalmancsok/"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:scale-110 transition-transform"
								>
									<SiInstagram className="w-6 h-6 text-accent-500" />
								</a>
								<a
									href="https://www.facebook.com/angyalmancsok"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:scale-110 transition-transform"
								>
									<SiFacebook className="w-6 h-6 text-accent-500" />
								</a>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ContactFormSection;
