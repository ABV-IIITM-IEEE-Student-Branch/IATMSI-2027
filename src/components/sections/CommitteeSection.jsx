import {
    honoraryGeneralChairs,
    generalChairs,
    conferenceChairs,
    conferenceCoChairs,
    organizingChairs,
} from '../../data/committeeData';

import MemberCard from '../committee/MemberCard';

export default function CommitteeSection() {
    return (
        <div className="bg-[#FAF6EE] pb-16">
            {/* Page Header */}
            

            <section className="py-8 md:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-10">
                        {/* Honorary General Chairs */}
                        <div>
                            <h2 className="text-base md:text-2xl md:text-3xl font-bold text-neutral-900 mb-5 text-center">Honorary General Chairs</h2>
                            <div className="flex flex-wrap justify-center items-stretch gap-4">
                                {honoraryGeneralChairs.map((member, index) => (
                                    <MemberCard key={index} member={member} />
                                ))}
                            </div>
                        </div>

                        {/* General Chair */}
                        <div>
                            <h2 className="text-base md:text-2xl md:text-3xl font-bold text-neutral-900 mb-5 text-center">General Chair</h2>
                            <div className="flex flex-wrap justify-center items-stretch gap-4">
                                {generalChairs.map((member, index) => (
                                    <MemberCard key={index} member={member} />
                                ))}
                            </div>
                        </div>

                        {/* Conference Chairs */}
                        <div>
                            <h2 className="text-base md:text-2xl md:text-3xl font-bold text-neutral-900 mb-5 text-center">Conference Chairs</h2>
                            <div className="flex flex-wrap justify-center items-stretch gap-4">
                                {conferenceChairs.map((member, index) => (
                                    <MemberCard key={index} member={member} />
                                ))}
                            </div>
                        </div>

                        {/* Conference Co-Chair */}
                        <div>
                            <h2 className="text-base md:text-2xl md:text-3xl font-bold text-neutral-900 mb-5 text-center">Conference Co-Chair</h2>
                            <div className="flex flex-wrap justify-center items-stretch gap-4">
                                {conferenceCoChairs.map((member, index) => (
                                    <MemberCard key={index} member={member} />
                                ))}
                            </div>
                        </div>

                        {/* Organizing Chairs */}
                        <div>
                            <h2 className="text-base md:text-2xl md:text-3xl font-bold text-neutral-900 mb-5 text-center">Organizing Chairs</h2>
                            <div className="flex flex-wrap justify-center items-stretch gap-4">
                                {organizingChairs.map((member, index) => (
                                    <MemberCard key={index} member={member} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
