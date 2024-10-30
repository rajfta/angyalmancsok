import { type FC } from "react";

const Paw: FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            zoomAndPan="magnify"
            viewBox="0 0 90 89.999999"
            height="120"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
        >
            <defs>
                <filter
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    id="1fed230824"
                >
                    <feColorMatrix
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                        color-interpolation-filters="sRGB"
                    />
                </filter>
                <filter
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    id="324a1869bc"
                >
                    <feColorMatrix
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.2126 0.7152 0.0722 0 0"
                        color-interpolation-filters="sRGB"
                    />
                </filter>
                <image
                    x="0"
                    y="0"
                    width="758"
                    id="a533880520"
                    height="795"
                    preserveAspectRatio="xMidYMid meet"
                />
                <mask id="fd03ba1c93">
                    <g filter="url(#1fed230824)">
                        <g
                            filter="url(#324a1869bc)"
                            transform="matrix(0.118734, 0, 0, 0.118868, 0.0000005, 0.000002)"
                        >
                            <image
                                x="0"
                                y="0"
                                width="758"
                                height="795"
                                preserveAspectRatio="xMidYMid meet"
                            />
                        </g>
                    </g>
                </mask>
                <image
                    x="0"
                    y="0"
                    width="758"
                    id="9cfd7b0d40"
                    height="795"
                    preserveAspectRatio="xMidYMid meet"
                />
            </defs>
            <g mask="url(#fd03ba1c93)">
                <g transform="matrix(0.118734, 0, 0, 0.118868, 0.0000005, 0.000002)">
                    <image
                        x="0"
                        y="0"
                        width="758"
                        height="795"
                        preserveAspectRatio="xMidYMid meet"
                    />
                </g>
            </g>
        </svg>
    );
};

export default Paw;
