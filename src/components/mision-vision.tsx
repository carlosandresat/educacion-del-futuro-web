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
          The king thought long and hard, and finally came up with{" "}
          <a
            href="#"
            className="font-medium text-primary underline underline-offset-4"
          >
            a brilliant plan
          </a>
          : he would tax the jokes in the kingdom.
        </p>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
        &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so its only fair
          that they should pay for the privilege.
        </blockquote>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          The Joke Tax
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The kings subjects were not amused. They grumbled and complained, but
          the king was firm:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners : 20 gold coins</li>
        </ul>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          As a result, people stopped telling jokes, and the kingdom fell into a
          gloom. But there was one person who refused to let the kings
          foolishness get him down: a court jester named Jokester.
        </p>
      </div>
    </div>
    <div className="flex items-center flex-wrap my-10 max-w-screen-xl">
    <div className="w-full md:w-1/2 lg:w-1/2 p-4 ">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
          Visión
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The king thought long and hard, and finally came up with{" "}
          <a
            href="#"
            className="font-medium text-primary underline underline-offset-4"
          >
            a brilliant plan
          </a>
          : he would tax the jokes in the kingdom.
        </p>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          After all, he said, everyone enjoys a good joke, so its only fair
          that they should pay for the privilege.
        </blockquote>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          The Joke Tax
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The kings subjects were not amused. They grumbled and complained, but
          the king was firm:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners : 20 gold coins</li>
        </ul>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          As a result, people stopped telling jokes, and the kingdom fell into a
          gloom. But there was one person who refused to let the kings
          foolishness get him down: a court jester named Jokester.
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
