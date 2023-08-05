"use client"
import { useEffect, useRef } from "react";

const Home = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDraggingRef = useRef<boolean[]>([]);
    const imageRefs = useRef<{ x: number; y: number }[]>([
        { x: 0, y: 0 },
        { x: 100, y: 100 }
    ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.style.border = "2px solid";

        const context = canvas.getContext("2d");
        if (!context) return;

        const images: HTMLImageElement[] = [];
        const imageSources = ["/AWS/ec2.svg", "/AWS/ec2.svg"];
        let numLoadedImages = 0;

        const handleImageLoad = () => {
            numLoadedImages++;

            if (numLoadedImages === imageSources.length) {
                animate();
            }
        };

        imageSources.forEach((source, index) => {
            const image = new Image();
            image.src = source;
            image.addEventListener("load", handleImageLoad);
            images[index] = image;
            isDraggingRef.current[index] = false;
        });

        const handleMouseDown = (event: MouseEvent) => {
            const mouseX = event.clientX - canvas.offsetLeft;
            const mouseY = event.clientY - canvas.offsetTop;

            for (let i = images.length - 1; i >= 0; i--) {
                const image = images[i];
                const { x, y } = imageRefs.current[i];

                if (
                    mouseX >= x &&
                    mouseX <= x + image.width &&
                    mouseY >= y &&
                    mouseY <= y + image.height
                ) {
                    // Move the clicked image to the last position in the array
                    const clickedImage = images.splice(i, 1)[0];
                    images.push(clickedImage);

                    // Move the corresponding imageRef to the last position in the array
                    const clickedImageRef = imageRefs.current.splice(i, 1)[0];
                    imageRefs.current.push(clickedImageRef);

                    // Set isDragging to false for all images except the clicked one
                    isDraggingRef.current = isDraggingRef.current.map(
                        (_, index) => index === images.length - 1
                    );

                    break;
                }
            }
        };

        const handleMouseUp = () => {
            isDraggingRef.current = isDraggingRef.current.map(() => false);
        };

        const handleMouseMove = (event: MouseEvent) => {
            for (let i = 0; i < images.length; i++) {
                if (isDraggingRef.current[i]) {
                    const image = images[i];
                    const { x, y } = imageRefs.current[i];

                    imageRefs.current[i] = {
                        x: x + event.movementX,
                        y: y + event.movementY
                    };
                }
            }
        };

        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                const { x, y } = imageRefs.current[i];
                context.drawImage(image, x, y);
            }

            requestAnimationFrame(animate);
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mousemove", handleMouseMove);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} width="1280px" height="720px" />
        </>
    );
};

export default Home;