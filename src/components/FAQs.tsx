import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQsProps {
    items: FAQItem[];
}

export function FAQs({ items }: FAQsProps) {
    return (
        <Accordion type="single" collapsible className="max-w-4xl mx-auto text-left">
            {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-slate-200 border-b last:border-b-0">
                    <AccordionTrigger className="text-[#0F172A] hover:text-brand-green hover:no-underline text-lg md:text-xl font-['Manrope'] font-bold py-6 text-left transition-colors">
                        {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#64748B] text-base md:text-lg leading-relaxed pb-6 font-['Manrope']">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
