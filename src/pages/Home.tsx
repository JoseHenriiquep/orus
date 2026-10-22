import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Differentials } from '@/components/sections/Differentials';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { site } from '@/config/site';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = `${site.name} — ${site.slogan.replace(/\.$/, '')}`;
  }, []);

  // Vindo de outra página com âncora (ex.: /#contato), rola até a seção.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Projects />
      <Differentials />
      <About />
      <Contact />
      <WhatsAppFab />
    </>
  );
}
