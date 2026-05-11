import { Link } from "react-router-dom";
import { Leaf, Mail, ExternalLink } from "lucide-react";

const journalLinks = [
  { label: "Aims & Scope", to: "/about" },
  { label: "Editorial Board", to: "/about#board" },
  { label: "Submission Guidelines", to: "/submit" },
  { label: "Peer Review Process", to: "/about#review" },
  { label: "Open Access Policy", to: "/about#oa" },
];

const browseLinks = [
  { label: "All Articles", to: "/search" },
  { label: "Climate Change", to: "/search?category=climate-change" },
  { label: "Biodiversity", to: "/search?category=biodiversity" },
  { label: "Marine Ecosystems", to: "/search?category=marine-ecosystems" },
  { label: "Browse Authors", to: "/authors" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <Leaf className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-green-400 tracking-widest">JESAM</span>
                <span className="text-[9px] text-gray-500 tracking-wide uppercase">Environmental Science</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Journal of Environmental Science and Applied Methodology. Peer-reviewed research advancing environmental knowledge and sustainable futures.
            </p>
            <p className="text-xs text-gray-600">
              ISSN 2350-1892 (print)<br />
              ISSN 2350-1906 (online)
            </p>
          </div>

          {/* Journal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Journal</h3>
            <ul className="space-y-2">
              {journalLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-green-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Browse */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Browse</h3>
            <ul className="space-y-2">
              {browseLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-green-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-green-700" />
                <span>editorial@jesam-journal.org</span>
              </li>
              <li className="text-sm">
                Faculty of Environmental Sciences<br />
                University of Zagreb<br />
                Zagreb, Croatia
              </li>
            </ul>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="inline-flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
              >
                CrossRef <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-gray-700">·</span>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
              >
                DOAJ <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-gray-700">·</span>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
              >
                Scopus <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} JESAM Journal. Published under Creative Commons CC BY 4.0.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-400 transition-colors">Terms of Use</Link>
            <Link to="/cookies" className="hover:text-gray-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
