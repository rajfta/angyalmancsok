import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { FC } from "react";
import FlipCard from "~/components/ui/FlipCard";
import type { Dog } from "~/types/content";

const DogFlipCard: FC<{ dog: Dog }> = ({ dog }) => {
	return (
		<FlipCard
			FrontSide={<FrontSide dog={dog} showText />}
			BackSide={<BackSide dog={dog} showText />}
		/>
	);
};

export const FrontSide: FC<{ dog: Dog; showText: boolean }> = ({
	dog,
	showText,
}) => {
	return (
		<div className="w-full h-full">
			{dog.thumbnail?.fields?.file?.url && (
				<img
					src={dog.thumbnail.fields.file.url}
					alt={dog.thumbnail.fields.title ?? "angyalmancs csapattag"}
					className="w-full aspect-[2/3] object-contain"
				/>
			)}
			<div
				style={{
					opacity: showText ? 1 : 0,
					transition: "opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) 400ms",
				}}
				className="p-6 pt-4 flex flex-col gap-2"
			>
				<h2>{dog.name}</h2>

				<div>
					<span>Gazdi: </span>
					<span className="text-sm text-gray-500">{dog.ownerName}</span>
				</div>

				{dog.nicknames && (
					<div>
						<span>Becenevek: </span>
						<span className="text-sm text-gray-500">
							{dog.nicknames.join(", ")}
						</span>
					</div>
				)}

				{dog.workplaces && (
					<div>
						<span>Munkahely:</span>
						<ul className="text-sm ml-2 text-gray-500">
							{dog.workplaces.map((workplace) => (
								<li key={workplace}>• {workplace}</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export const BackSide: FC<{ dog: Dog; showText: boolean }> = ({
	dog,
	showText,
}) => {
	return (
		<div className="w-full h-full">
			{dog.photoWithOwner?.fields?.file?.url && (
				<img
					src={dog.photoWithOwner.fields.file.url}
					alt={dog.photoWithOwner.fields.title ?? "angyalmancs csapattag"}
					className="w-full object-contain"
				/>
			)}
			<div
				style={{
					opacity: showText ? 1 : 0,
					transition: "opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) 400ms",
				}}
				className="p-6 pt-4 flex flex-col gap-2"
			>
				{documentToReactComponents(dog.content)}
			</div>
		</div>
	);
};

export default DogFlipCard;
