import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const Avator = ({ src }: { src?: string }) => {
  if (src) {
    return (
      <main className="">
        <section className="">
          <Image
            src={src}
            className="rounded-full border-2 border-gray-50"
            alt={"Avator Iamge"}
            width={30}
            height={30}
          />
        </section>
      </main>
    );
  }
  // return "No Avator Iamge";
  return <FaUserCircle size={24} />;
};

export default Avator;
