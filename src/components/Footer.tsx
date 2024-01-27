import { DATE_MODIFIED, APP_VERSION } from "../lib/constants";

const navigation = {
  solutions: [
    //   { name: 'Marketing', href: '#' },
    //   { name: 'Analytics', href: '#' },
    //   { name: 'Commerce', href: '#' },
    //   { name: 'Insights', href: '#' },
  ],
  support: [
    //   { name: 'Pricing', href: '#' },
    //   { name: 'Documentation', href: '#' },
    //   { name: 'Guides', href: '#' },
    //   { name: 'API Status', href: '#' },
  ],
  company: [
    { name: "How to Guide", href: "/how-to-guide" },
    { name: "Shop Packs", href: "/shop-packs" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Drops", href: "/drops" },
    { name: "About", href: "/about" },
    { name: "TENAMINT.com", href: "https://tenamint.com/" },
  ],
  legal: [
    { name: "Help & Customer Support", href: "/help-support" },
    { name: "Disclaimer", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Sse", href: "#" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black mt-40" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-16 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <img
            className="h-48"
            src="/images/logo-white.png"
            alt="Company name"
          />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {/* <h3 className="text-sm font-semibold leading-6 text-white">Solutions</h3> */}
                <ul role="list" className="mt-6 space-y-4">
                  {/* {navigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))} */}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                {/* <h3 className="text-sm font-semibold leading-6 text-white">Support</h3> */}
                <ul role="list" className="mt-6 space-y-4">
                  {/* {navigation.support.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))} */}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {/* <h3 className="text-sm font-semibold leading-6 text-white">Company</h3> */}
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                {/* <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3> */}
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm text-white">
            Date modified: {DATE_MODIFIED}<br/>
            Version: {APP_VERSION}
          </p>
          <p className="text-sm text-white">
            {" "}
            © {year} Basketball Pick&apos;em Powered by TENAMINT. All rights reserved.{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}
