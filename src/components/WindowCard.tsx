import { useCallback, useState, type FC } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "~/components/ui/resizable";
import type { Dog } from "~/types/content";

const WindowCard: FC<{ dog: Dog }> = ({ dog }) => {
    const [threshold, setThreshold] = useState(0);

    const handleClick = useCallback(() => {
        setThreshold((prev) => (prev === 0 ? 100 : 0));
    }, []);

    return (
        <div
            onClick={handleClick}
            className="w-80 h-[820px] shadow-lg overflow-hidden rounded-md"
        >
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={100}
                    style={{
                        flex: `${threshold}%`,
                        transition: "flex 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <Frontside
                        dog={dog}
                        showText={threshold === 0 ? false : true}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    defaultSize={0}
                    style={{
                        flex: `${100 - threshold}%`,
                        transition: "flex 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <Backside
                        dog={dog}
                        showText={threshold === 0 ? true : false}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

const Frontside: FC<{ dog: Dog; showText: boolean }> = ({ dog, showText }) => {
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
                    transition:
                        "opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) 400ms",
                }}
                className="p-6 pt-4 flex flex-col gap-2"
            >
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

const Backside: FC<{ dog: Dog; showText: boolean }> = ({ dog, showText }) => {
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
            <div
                style={{
                    opacity: showText ? 1 : 0,
                    transition:
                        "opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) 400ms",
                }}
                className="p-6 pt-4 flex flex-col gap-2"
            >
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
