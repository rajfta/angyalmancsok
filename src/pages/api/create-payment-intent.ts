import type { APIRoute } from "astro";
import Stripe from "stripe";

const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		if (!stripe) {
			return new Response(
				JSON.stringify({ error: "Fizetési rendszer nincs konfigurálva" }),
				{ status: 503, headers: { "Content-Type": "application/json" } },
			);
		}
		const body = await request.json();
		const { amount, name, email } = body;

		if (!amount || amount < 200) {
			return new Response(
				JSON.stringify({ error: "Minimum adomány összeg 200 Ft" }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}

		const convertedAmount = Math.round(amount * 100); // Convert HUF to the smallest currency unit

		const paymentIntent = await stripe.paymentIntents.create({
			amount: convertedAmount,
			currency: "huf",
			automatic_payment_methods: {
				enabled: true,
			},
			metadata: {
				donor_name: name || "Névtelen",
				donor_email: email || "",
			},
			receipt_email: email || undefined,
		});

		return new Response(
			JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			{ status: 200, headers: { "Content-Type": "application/json" } },
		);
	} catch (error) {
		console.error("Stripe error:", error);
		const message =
			error instanceof Error ? error.message : "Ismeretlen hiba történt";
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
