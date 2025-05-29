import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | Faberland Metaverse",
  description: "Legal terms and conditions for purchasing and renting virtual land in the Faberland metaverse",
}

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Terms & Conditions</h1>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-12">
        <div className="prose prose-invert max-w-none">
          <h2>Faberland Virtual Land Purchase & Rental Agreement</h2>
          <p className="text-gray-300">Last Updated: May 20, 2025</p>

          <h3>1. Definitions</h3>
          <p>
            <strong>1.1 "Faberland"</strong> refers to the virtual metaverse platform operated by Visser Studios.
          </p>
          <p>
            <strong>1.2 "Faberland Estate"</strong> refers to a large virtual land parcel represented as a Fabergé egg
            NFT, available for purchase on OpenSea and other NFT marketplaces.
          </p>
          <p>
            <strong>1.3 "Faberplot"</strong> refers to a smaller virtual land parcel represented as a Fabergé egg,
            available exclusively through the Faberland marketplace.
          </p>
          <p>
            <strong>1.4 "User"</strong> refers to any individual or entity that purchases, rents, or interacts with
            Faberland virtual real estate.
          </p>

          <h3>2. Ownership Rights</h3>
          <p>
            <strong>2.1</strong> Ownership of a Faberland Estate or Faberplot grants the User certain rights within the
            Faberland metaverse, including but not limited to:
          </p>
          <ul>
            <li>The right to build and customize virtual structures on the owned land</li>
            <li>The right to host events and activities within the owned space</li>
            <li>The right to monetize the owned space through rental, advertising, or other approved means</li>
            <li>The right to transfer ownership through sale or gift</li>
          </ul>
          <p>
            <strong>2.2</strong> Ownership of virtual land does not confer any ownership rights to the Faberland
            platform itself, its code, assets, or intellectual property.
          </p>

          <h3>3. Rental Terms</h3>
          <p>
            <strong>3.1 Rental Period</strong>: Land rental agreements are available in increments of 30, 90, or 365
            days.
          </p>
          <p>
            <strong>3.2 Rental Rights</strong>: Renters receive limited usage rights to the virtual land, including:
          </p>
          <ul>
            <li>The right to build temporary structures (subject to owner-defined limitations)</li>
            <li>The right to host events (subject to owner-defined limitations)</li>
            <li>The right to display content (subject to owner-defined limitations and platform guidelines)</li>
          </ul>
          <p>
            <strong>3.3 Restrictions</strong>: Renters may not:
          </p>
          <ul>
            <li>Transfer rental rights to another party</li>
            <li>Modify the underlying land parameters</li>
            <li>Claim ownership of the rented space</li>
            <li>Violate any platform guidelines or terms of service</li>
          </ul>

          <h3>4. Payment Terms</h3>
          <p>
            <strong>4.1</strong> All purchases and rentals are denominated in US Dollars (USD) but may be paid in
            cryptocurrency at the current exchange rate at the time of transaction.
          </p>
          <p>
            <strong>4.2</strong> Faberland Estates purchased as NFTs on OpenSea or other marketplaces are subject to the
            payment terms of those platforms.
          </p>
          <p>
            <strong>4.3</strong> Faberplots purchased directly through the Faberland marketplace require payment in full
            at the time of purchase.
          </p>
          <p>
            <strong>4.4</strong> Rental payments are due in full at the beginning of the rental period.
          </p>

          <h3>5. Content Guidelines</h3>
          <p>
            <strong>5.1</strong> All content created, displayed, or hosted on Faberland virtual real estate must comply
            with the Faberland Community Guidelines and applicable laws.
          </p>
          <p>
            <strong>5.2</strong> Prohibited content includes but is not limited to:
          </p>
          <ul>
            <li>Illegal content or activities</li>
            <li>Hateful, discriminatory, or harassing content</li>
            <li>Sexually explicit or excessively violent content</li>
            <li>Content that infringes on intellectual property rights</li>
            <li>Malicious code or exploits</li>
          </ul>

          <h3>6. Termination</h3>
          <p>
            <strong>6.1</strong> Visser Studios reserves the right to terminate access to the Faberland platform for
            Users who violate these terms or the Community Guidelines.
          </p>
          <p>
            <strong>6.2</strong> In the event of termination due to violations, ownership of virtual land may be
            suspended or revoked without refund.
          </p>

          <h3>7. Changes to Terms</h3>
          <p>
            <strong>7.1</strong> Visser Studios reserves the right to modify these terms at any time. Users will be
            notified of significant changes.
          </p>
          <p>
            <strong>7.2</strong> Continued use of the platform after changes to the terms constitutes acceptance of the
            new terms.
          </p>

          <h3>8. Limitation of Liability</h3>
          <p>
            <strong>8.1</strong> Visser Studios is not liable for any loss of value, access, or functionality of virtual
            land due to platform changes, technical issues, or market fluctuations.
          </p>
          <p>
            <strong>8.2</strong> Users acknowledge that virtual assets carry inherent risks and that values may
            fluctuate significantly.
          </p>

          <h3>9. Governing Law</h3>
          <p>
            <strong>9.1</strong> These terms are governed by and construed in accordance with the laws of the
            jurisdiction in which Visser Studios operates.
          </p>
          <p>
            <strong>9.2</strong> Any disputes arising from these terms shall be resolved through arbitration in
            accordance with the rules of the American Arbitration Association.
          </p>

          <h3>10. Contact Information</h3>
          <p>
            For questions or concerns regarding these terms, please contact us at:
            <br />
            <a href="mailto:legal@faberland.com" className="text-purple-400 hover:text-purple-300">
              legal@faberland.com
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
