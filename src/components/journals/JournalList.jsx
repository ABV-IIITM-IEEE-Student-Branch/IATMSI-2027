import { journals, journalsNote } from '../../data/journalsData';
import JournalCard from './JournalCard';

export default function JournalList() {
    return (
        <div data-weavr-source="journalsData" className="space-y-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {journals.map((journal) => (
                    <JournalCard key={journal.id} journal={journal} />
                ))}
            </div>

            {/* More journals note */}
            <div className="text-center">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-500 font-medium text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    {journalsNote}
                </div>
            </div>
        </div>
    );
}

