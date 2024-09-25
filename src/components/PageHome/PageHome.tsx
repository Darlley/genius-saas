'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

import { ChartConfig } from '@/components/ui/chart';

export const description = 'A simple area chart';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

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

      <Carousel className="md:basis-1/2 lg:basis-1/3">
        <CarouselPrevious className="left-0 z-10" />
        <CarouselContent>
          <CarouselItem className="basis-1/2 sm:basis-1/3 flex items-center justify-center">
            <Card>
              <CardHeader>
                <Image
                  src="/abstract-high-contrast-white-wavy-shape-5.png"
                  alt="Forma Ondulada Branca de Alto Contraste 5"
                  width={2048}
                  height={2048}
                  className="w-full h-auto object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold">GPT</h3>
                <p className="text-sm text-muted-foreground">
                  Converse com a IA
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-1/2 sm:basis-1/3 flex items-center justify-center">
            <Card>
              <CardHeader>
                <Image
                  src="/translucent-crystal-ancient-greek-sculpture-2.png"
                  alt="Forma Ondulada Branca de Alto Contraste 5"
                  width={2048}
                  height={2048}
                  className="w-full h-auto object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold">RAG</h3>
                <p className="text-sm text-muted-foreground">
                  Converse com seus dados
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext className="right-0 z-10" />
      </Carousel>
    </main>
  );
}
