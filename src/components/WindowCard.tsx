import { useCallback, useState, type FC } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "~/components/ui/resizable";
import type { Dog } from "~/types/content";

const WindowCard: FC<{ dog: Dog }> = ({ dog }) => {
    const [panelThreshold, setPanelThreshold] = useState(0);

    const handleClick = useCallback(() => {
        const isAtZero = panelThreshold === 0;
        const startValue = isAtZero ? 0 : 100;
        const endValue = isAtZero ? 100 : 0;
        const startTime = Date.now();
        const duration = 400; // 0.4 seconds in ms

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Adjusted elastic easing parameters for smoother 0.4s animation
            const t = progress;
            const elasticOut =
                Math.pow(2, -8 * t) * Math.sin((t - 0.075) * 3 * Math.PI) + 1;
            const value = startValue + (endValue - startValue) * elasticOut;

            setPanelThreshold(Math.min(100, Math.max(0, value)));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [panelThreshold]);

    return (
        <div
            onClick={handleClick}
            className="w-80 h-[820px] shadow-lg overflow-hidden rounded-md"
        >
            <ResizablePanelGroup direction="vertical">
                <ResizablePanel
                    defaultSize={100}
                    style={{ flex: `${panelThreshold}%` }}
                >
                    <Frontside dog={dog} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    defaultSize={0}
                    style={{ flex: `${100 - panelThreshold}%` }}
                >
                    <Backside dog={dog} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

const Frontside: FC<{ dog: Dog }> = ({ dog }) => {
    return (
        <div className="w-full h-full">
            {dog.thumbnail?.fields?.file?.url && (
                <img
                    src={dog.thumbnail.fields.file.url}
                    alt={dog.thumbnail.fields.title ?? "angyalmancs csapattag"}
                    className="w-full aspect-[2/3] object-contain"
                />
            )}
            <div className="p-6 pt-4 flex flex-col gap-2">
                <h2>{dog.name}</h2>

                <div>
                    <span>Gazdi: </span>
                    <span className="text-sm text-gray-500">
                        {dog.ownerName}
                    </span>
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

const Backside: FC<{ dog: Dog }> = ({ dog }) => {
    return (
        <div className="w-full h-full">
            {dog.photoWithOwner?.fields?.file?.url && (
                <img
                    src={dog.photoWithOwner.fields.file.url}
                    alt={
                        dog.photoWithOwner.fields.title ??
                        "angyalmancs csapattag"
                    }
                    className="w-full object-contain"
                />
            )}
            <div className="p-6 pt-4 flex flex-col gap-2">
                <h2>{dog.name}</h2>

                <div>
                    <span>Gazdi: </span>
                    <span className="text-sm text-gray-500">
                        {dog.ownerName}
                    </span>
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

export default WindowCard;
