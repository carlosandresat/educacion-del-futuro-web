import Image from "next/image";

const socialNetworks = [
    { name: 'facebook', link: '#' },
    { name: 'twitter', link: '#' },
    { name: 'instagram', link: '#' },
    { name: 'linkedIn', link: '#' },
    { name: 'youTube', link: '#' }
  ];
  
  const Sidebar = () => {
    return (
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-secondary p-4">
        {socialNetworks.map((network) => (
          <a
            key={network.name}
            href={network.link}
            className="block mb-4 hover:bg-card p-2 rounded-full"
          >
            <Image
                src={`/icons/${network.name}.png`}
                alt={network.name}
                width={24}
                height={24}
                className="dark:invert"
            />
          </a>
        ))}
      </div>
    );
  };
  
  export default Sidebar;