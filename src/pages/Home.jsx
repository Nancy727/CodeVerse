import React from 'react'
import Hero from '../components/Hero'
import TechCard from '../components/TechCard'
import docker from '../data/docker.json'
import k8s from '../data/k3s.json'
import terraform from '../data/terraform.json'
import jenkins from '../data/jenkins.json'
import grafana from '../data/grafana.json'
import prometheus from '../data/prometheus.json'
import aws from '../data/aws.json'

export default function Home(){
  const normalize = (obj, id) => ({
    id,
    // title: prefer explicit title, then hero.heading, then hero.title
    title: obj.title || obj.hero?.heading || obj.hero?.title || id,
    // level/difficulty
    level: obj.level || obj.hero?.difficulty || obj.difficulty,
    // summary: prefer intro.what, then intro.what-like, then hero.subtitle
    summary: obj.intro?.what || obj.summary || obj.hero?.subtitle || '',
    // include the original object for deeper pages
    __raw: obj
  })

  const trending = [
    normalize(docker, 'docker'),
    normalize(k8s, 'k3s'),
    normalize(terraform, 'terraform'),
    normalize(jenkins, 'jenkins'),
    normalize(grafana, 'grafana'),
    normalize(prometheus, 'prometheus'),
    normalize(aws, 'aws')
  ]
  return (
    <div>
      <Hero />
      <section className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Trending Technologies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trending.map(t=> <TechCard key={t.id} tech={t} />)}
        </div>
      </section>
    </div>
  )
}
