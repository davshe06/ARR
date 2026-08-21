import { HOT_JOBS, JOBS } from '../data/seed';
import type { Job } from '../data/types';
import type { Bullpen } from '../state/useBullpen';
import { SectionHead } from './SectionHead';

function JobCard({ job, onOpen }: { job: Job; onOpen: () => void }) {
  return (
    <article className="card job-card">
      <div className="job-meta">
        <span className="job-num">{job.num}</span>
        <span className="job-company">{job.company}</span>
        <span className="job-heat">{job.heat}</span>
      </div>
      <h3 className="job-title">{job.title}</h3>
      <div className="job-facts">
        <span>{job.branch} branch</span>
        <span>{job.place}</span>
        <span>{job.pay}</span>
      </div>
      <div className="pill-row">
        {job.skills.map((skill) => (
          <span key={skill} className="tag tag-accent tag-pill-space">
            {skill}
          </span>
        ))}
      </div>
      <div className="job-footer">
        <span>{job.age}</span>
        <span>{job.subs}</span>
        <button type="button" className="link-action" onClick={onOpen}>
          Work the req
        </button>
      </div>
    </article>
  );
}

export function HotJobs({ app }: { app: Bullpen }) {
  return (
    <section>
      <SectionHead
        eyebrow="01 · Hot jobs"
        sub="Fill these before anything else"
        action={{ label: `All ${JOBS.length} reqs`, onClick: () => app.setRoute('requisitions') }}
      />
      <div className="jobs-grid">
        {HOT_JOBS.map((job) => (
          <JobCard key={job.id} job={job} onOpen={() => app.setOverlay({ kind: 'req', id: job.id })} />
        ))}
      </div>
    </section>
  );
}
