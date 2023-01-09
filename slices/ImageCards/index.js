import * as prismicH from '@prismicio/helpers';
import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

import { Bounded } from '../../components/Bounded';
import { Heading } from '../../components/Heading';
import { ConditionalWrap } from '../../components/ConditionalWrap';
import { useCallback } from 'react';

const ImageCard = ({ item }) => {
  const image = item.image;

  const prismicLinkCached = useCallback(
    (children) => (
      <PrismicLink field={item.buttonLink} tabIndex='-1'>
        {children}
      </PrismicLink>
    ),
    [item.buttonLink]
  );

  return (
    <li className='grid gap-8'>
      {prismicH.isFilled.image(image) && (
        <div className='bg-gray-100'>
          <ConditionalWrap
            condition={prismicH.isFilled.link(item.buttonLink)}
            wrap={({ children }) => prismicLinkCached(children)}>
            <PrismicNextImage field={image} sizes='100vw' className='w-full' alt={item.buttonLink} />
          </ConditionalWrap>
        </div>
      )}
      <div className='leading-relaxed'>
        <PrismicRichText field={item.text} />
      </div>
      {prismicH.isFilled.link(item.buttonLink) && (
        <div>
          <PrismicLink field={item.buttonLink} className='font-semibold'>
            {item.buttonText || 'More Info'}
          </PrismicLink>
        </div>
      )}
    </li>
  );
};

const ImageCards = ({ slice }) => {
  return (
    <Bounded as='section' className='bg-white'>
      <div className='grid gap-12'>
        {prismicH.isFilled.richText(slice.primary.heading) && (
          <Heading className='text-center'>
            <PrismicText field={slice.primary.heading} />
          </Heading>
        )}
        <ul className='grid grid-cols-1 items-start gap-8 md:grid-cols-2'>
          {slice.items.map((item) => (
            <ImageCard key={item.image.url} item={item} />
          ))}
        </ul>
      </div>
    </Bounded>
  );
};

export default ImageCards;
