import type { APIRoute } from "astro";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();
		const { amount, name, email } = body;

		if (!amount || amount < 100) {
			return new Response(
				JSON.stringify({ error: "Minimum adomány összeg 100 Ft" }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
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
