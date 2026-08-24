import { submissionCta } from '../../data/tracksData';
import { siteConfig } from '../../data/siteConfig';
import SectionContainer from '../ui/SectionContainer';
import Button from '../ui/Button';

export default function SubmissionCtaSection() {
    return (
        <SectionContainer dataSource="tracksData siteConfig" background="primary">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                    {submissionCta.title}
                </h2>
                <p className="text-base sm:text-base text-primary-700 mb-8 max-w-2xl mx-auto">
                    {submissionCta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button href={siteConfig.externalLinks.submissionPortal.url} variant="primary" size="md" target="_blank" rel="noopener noreferrer">
                        {submissionCta.buttonLabel}
                    </Button>
                </div>
            </div>
        </SectionContainer>
    );
}
