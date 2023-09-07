//Mission and vision component
import Image from "next/image";

export function MissionVision() {
  return (
    <>
    <div className="flex items-center flex-wrap my-10 max-w-screen-xl">
      <div className="flex w-full md:w-1/2 lg:w-1/2 p-4 justify-center">
        <Image
          src="/next.svg"
          alt="Logo"
          width={400}
          height={400}
          className="dark:invert"
        />
      </div>

      <div className="w-full md:w-1/2 lg:w-1/2 p-4">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
          Misión
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta dui, nec fermentum orci aliquam nec. Aenean id tortor quis est varius pulvinar. Vestibulum tempus facilisis lectus, quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum metus ut, cursus turpis. Mauris malesuada eget tellus a gravida. Nam sit amet sollicitudin arcu, a feugiat metus. Maecenas ultrices, justo eget consequat imperdiet, libero ipsum consectetur nisl, aliquet condimentum felis tellus in eros.
        </p>
        
      </div>
    </div>
    <div className="flex items-center flex-wrap my-10 max-w-screen-xl">
    <div className="w-full md:w-1/2 lg:w-1/2 p-4 ">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
          Visión
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta dui, nec fermentum orci aliquam nec. Aenean id tortor quis est varius pulvinar. Vestibulum tempus facilisis lectus, quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum metus ut, cursus turpis. Mauris malesuada eget tellus a gravida. Nam sit amet sollicitudin arcu, a feugiat metus. Maecenas ultrices, justo eget consequat imperdiet, libero ipsum consectetur nisl, aliquet condimentum felis tellus in eros.
        </p>
        
      </div>
      <div className="flex w-full md:w-1/2 lg:w-1/2 p-4 justify-center">
        <Image
          src="/next.svg"
          alt="Logo"
          width={400}
          height={400}
          className="dark:invert"
        />
      </div>

      
    </div>
    </>
  );
}
