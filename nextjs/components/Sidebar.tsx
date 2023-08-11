import Image from "next/image";
import iconEC2 from "../public/AWS/computing/ec2.svg";

export const Sidebar = () => {
    return (
        <>
            <div className="bg-blue-500 w-[250px] h-full flex flex-col">
                <div className="bg-gray-300 w-full h-[200px] flex flex-col">
                    Computing
                    <div className="w-full flex flex-col items-center">
                        <Image src={iconEC2} className="w-[60px]" alt=""/>
                        <div>Amazon EC2</div>
                    </div>
                </div>
            </div>
        </>
    );
}
