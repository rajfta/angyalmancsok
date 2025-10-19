import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.GITHUB_BRANCH ||
	process.env.VERCEL_GIT_COMMIT_REF ||
	process.env.HEAD ||
	"master";

const clientId = process.env.TINA_CLIENT_ID || "";
const token = process.env.TINA_TOKEN || "";

export default defineConfig({
	branch,

	// Get this from tina.io (optional for local development)
	clientId,
	token,

	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},
	media: {
		tina: {
			mediaRoot: "",
			publicFolder: "public",
		},
	},
	schema: {
		collections: [
			{
				name: "dogs",
				label: "Dogs",
				path: "src/content/dogs",
				format: "mdx",
				fields: [
					{
						type: "string",
						name: "name",
						label: "Name",
						isTitle: true,
						required: true,
					},
					{
						type: "image",
						name: "thumbnail",
						label: "Dog Photo",
						required: true,
					},
					{
						type: "image",
						name: "photoWithOwner",
						label: "Photo with Trainer",
					},
					{
						type: "string",
						name: "nicknames",
						label: "Nicknames",
						list: true,
					},
					{
						type: "string",
						name: "workplaces",
						label: "Workplaces",
						list: true,
					},
					{
						type: "string",
						name: "owner",
						label: "Trainer (file slug)",
						description: "Enter the trainer's file slug (e.g., gemesi-rita)",
					},
					{
						type: "string",
						name: "certificates",
						label: "Certificates",
						list: true,
						options: ["SEGÍTŐ", "TANULÓ", "TERÁPIÁS"],
					},
					{
						type: "number",
						name: "priority",
						label: "Priority (higher = more important)",
						required: true,
					},
					{
						type: "rich-text",
						name: "body",
						label: "Description",
						isBody: true,
					},
				],
			},
			{
				name: "members",
				label: "Trainers",
				path: "src/content/members",
				format: "mdx",
				fields: [
					{
						type: "string",
						name: "name",
						label: "Name",
						isTitle: true,
						required: true,
					},
					{
						type: "image",
						name: "picture",
						label: "Photo",
						required: true,
					},
					{
						type: "string",
						name: "role",
						label: "Role",
						required: true,
					},
					{
						type: "string",
						name: "dogs",
						label: "Dogs (file slugs)",
						list: true,
						description: "Enter dog file slugs (e.g., enid, isha, nala)",
					},
					{
						type: "string",
						name: "titles",
						label: "Titles/Certifications",
					},
					{
						type: "number",
						name: "priority",
						label: "Priority (lower = appears first)",
						required: true,
					},
					{
						type: "rich-text",
						name: "body",
						label: "Biography",
						isBody: true,
					},
				],
			},
			{
				name: "posts",
				label: "Posts",
				path: "src/content/posts",
				format: "mdx",
				fields: [
					{
						type: "string",
						name: "title",
						label: "Title",
						isTitle: true,
						required: true,
					},
					{
						type: "string",
						name: "slug",
						label: "URL Slug",
						required: true,
					},
					{
						type: "image",
						name: "thumbnail",
						label: "Thumbnail",
					},
					{
						type: "string",
						name: "description",
						label: "Description",
						ui: {
							component: "textarea",
						},
					},
					{
						type: "datetime",
						name: "date",
						label: "Date Posted",
						required: true,
					},
					{
						type: "number",
						name: "priority",
						label: "Priority",
					},
					{
						type: "image",
						name: "gallery",
						label: "Gallery Images",
						list: true,
					},
					{
						type: "rich-text",
						name: "body",
						label: "Content",
						isBody: true,
					},
				],
			},
			{
				name: "testimonials",
				label: "Testimonials",
				path: "src/content/testimonials",
				format: "mdx",
				fields: [
					{
						type: "string",
						name: "quote",
						label: "Quote",
						isTitle: true,
						required: true,
						ui: {
							component: "textarea",
						},
					},
					{
						type: "string",
						name: "author",
						label: "Author",
						required: true,
					},
					{
						type: "string",
						name: "dogName",
						label: "Dog Name",
						required: true,
					},
					{
						type: "string",
						name: "handlerName",
						label: "Handler Name",
						required: true,
					},
					{
						type: "image",
						name: "dogPhoto",
						label: "Dog Photo",
						required: true,
					},
					{
						type: "number",
						name: "priority",
						label: "Priority (order in carousel)",
					},
				],
			},
			{
				name: "partners",
				label: "Partners",
				path: "src/content/partners",
				format: "mdx",
				fields: [
					{
						type: "string",
						name: "name",
						label: "Name",
						isTitle: true,
						required: true,
					},
					{
						type: "image",
						name: "logo",
						label: "Logo",
						required: true,
					},
					{
						type: "string",
						name: "website",
						label: "Website URL",
					},
					{
						type: "number",
						name: "priority",
						label: "Priority (display order)",
					},
				],
			},
			{
				name: "programs",
				label: "Programs",
				path: "src/content/programs",
				format: "mdx",
				fields: [
					{
						type: "string",
						name: "title",
						label: "Title",
						isTitle: true,
						required: true,
					},
					{
						type: "string",
						name: "description",
						label: "Description",
						required: true,
						ui: {
							component: "textarea",
						},
					},
					{
						type: "string",
						name: "icon",
						label: "Icon Name (lucide-react)",
						required: true,
					},
					{
						type: "image",
						name: "imageUrl",
						label: "Program Image",
					},
					{
						type: "number",
						name: "priority",
						label: "Priority (display order)",
					},
				],
			},
		],
	},
});
