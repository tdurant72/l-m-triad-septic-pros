import { Question } from 'schema-dts';
import { FAQs } from "../FAQs";
import { homepageFaqSchema } from "@/lib/seo";

export default function HomepageFAQs() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex flex-col justify-between items-center mb-12 gap-4">
                    <h2 className="font-['Manrope'] text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 md:mb-0">Common Questions</h2>
                    <a href="tel:3365786972" className="flex items-center gap-2 text-brand-green font-bold hover:underline">
                        <span className="material-symbols-outlined">call</span> Or Call Us With Your Questions
                    </a>
                </div>
                <FAQs items={(homepageFaqSchema.mainEntity as Question[]).map((item) => ({
                    question: item.name as string,
                    answer: (item.acceptedAnswer as { text: string }).text,
                }))} />
            </div>
        </section>
    )
}