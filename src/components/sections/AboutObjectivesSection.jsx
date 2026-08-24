import { conferenceObjectives, conferenceObjectivesHeader } from '../../data/conferenceData';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import Card from '../ui/Card';

export default function AboutObjectivesSection() {
    return (
        <SectionContainer dataSource="conferenceData" background="light">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <SectionHeader
                    title={conferenceObjectivesHeader.title}
                    subtitle={conferenceObjectivesHeader.subtitle}
                />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {conferenceObjectives.map((objective, idx) => (
                    <Card key={idx} hover className="border border-slate-100">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center text-[#5B1824] font-extrabold">
                                {idx + 1}
                            </div>
                            <p className="text-slate-700 leading-relaxed font-medium pt-1">
                                {objective}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </SectionContainer>
    );
}
