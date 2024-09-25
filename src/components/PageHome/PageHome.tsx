'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

import { PageHomeProps } from './PageHome.types';
export default function PageHome(props: PageHomeProps) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Seja Bem-vindo 🎉</h1>
        <p className="text-sm md:text-base mt-2">
          Explore as aplicações integradas com inteligência artificial para uma
          experiência mais eficiente.
        </p>
      </div>

      <Carousel>
        <CarouselPrevious className="left-0 z-10" />
        <CarouselContent>
          <CarouselItem className="basis-1/2 sm:basis-1/3 flex items-center justify-center">
            <div className="w-[300px] h-[390px] rounded-lg p-1 bg-radial-gradient-circle-230px-at-0-0 bg-white bg-0c0d0d relative">
              <div className="dot"></div>
              <div className="w-full h-full rounded-lg border border-white/10 bg-[radial-gradient(circle_280px_at_0%_0%,_#444444,_#0c0d0d)] flex items-center justify-center relative flex-col text-white">
                <div
                  className="w-[120px] h-[20px] rounded-full absolute bg-white/20 filter-blur-[10px] top-0 left-0"
                  style={{
                    transform: 'rotate(40deg)',
                    transformOrigin: '10%',
                    boxShadow: '0 0 50px #fff',
                    filter: 'blur(10px)',
                  }}
                />
                <div className="text-center flex flex-col gap-1 items-center justify-center">
                  <h3 className="text-xl font-bold">AI RAG</h3>
                  <div>Converse com seus dados</div>
                </div>
                <div className="line topl" />
                <div className="line leftl" />
                <div className="line bottoml" />
                <div className="line rightl" />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 sm:basis-1/3 flex items-center justify-center">
            <div className="w-[300px] h-[390px] rounded-lg p-1 bg-radial-gradient-circle-230px-at-0-0 bg-white bg-0c0d0d relative">
              <div className="dot"></div>
              <div className="w-full h-full rounded-lg border border-white/10 bg-[radial-gradient(circle_280px_at_0%_0%,_#444444,_#0c0d0d)] flex items-center justify-center relative flex-col text-white">
                <div
                  className="w-[120px] h-[20px] rounded-full absolute bg-white/20 filter-blur-[10px] top-0 left-0"
                  style={{
                    transform: 'rotate(40deg)',
                    transformOrigin: '10%',
                    boxShadow: '0 0 50px #fff',
                    filter: 'blur(10px)',
                  }}
                />
                <div className="text-center flex flex-col gap-1 items-center justify-center">
                  <h3 className="text-xl font-bold">AI RAG</h3>
                  <div>Converse com seus dados</div>
                </div>
                <div className="line topl" />
                <div className="line leftl" />
                <div className="line bottoml" />
                <div className="line rightl" />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext className="right-0 z-10" />
      </Carousel>
    </main>
  );
}
