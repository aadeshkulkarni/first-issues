import React from "react";

const About = () => {
  return (
    <div className="flex flex-col gap-8 text-xl text-slate-700 leading-7">
      <p>
        <strong className="text-2xl">Good First Issues</strong> is a dedicated
        initiative aimed at curating beginner-friendly issues from popular
        open-source projects. Our goal is to make it easier for developers who
        have never contributed to open-source to get started quickly and
        confidently.
      </p>
      <p>
        Open-source maintainers are always eager to welcome new contributors,
        but many aspiring developers find the idea of contributing intimidating.
        The perception that becoming an open-source contributor is a daunting
        task often creates a barrier to entry.
      </p>
      <p>
        At Good First Issue, we believe that by guiding developers to tackle
        straightforward, well-defined issues, we can help lower this barrier. By
        addressing these super-easy issues, new contributors can gain the
        experience and confidence needed to make more substantial contributions
        in the future.
      </p>
      <p>
        This philosophy is the core reason behind the existence of Good First
        Issue. We are committed to fostering a supportive and inclusive
        environment where developers of all skill levels can join the
        open-source community and start making meaningful contributions.
      </p>
    </div>
  );
};

export default About;
