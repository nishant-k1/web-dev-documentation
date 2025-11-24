// Wrapper component to handle data for On The Move
// Needs to be moved to a specific `fn` directory

import Link from 'next/link';
// import newswiresWidgetImage from './assets/Headline_List.svg';
import newswiresLogo from './assets/Newswires_Logo.svg';
import { FlexStoryCard } from '@newscorp-ghfb/dj-uds-shared';
import { GridCell } from '..';
import { HeadlineList, NewswiresArticlesWrapper, NewswiresLink, NewswiresLogo } from './styled';
import { withOwnTheme } from 'newskit';
import { Image } from '@/src/components';

const stylePresets = {
  link: {
    base: {
      textDecoration: 'none',
    },
    hover: {
      textDecoration: 'none',
    },
  },
};

const url = '/tags/newswires-articles';
const modCode = 'newswires_onFN';
const URL = `${url}/?mod=${modCode}`;

function NewswiresWidget({ content }) {
  const articlesNewswires =
    content?.search?.['OnTheMove']?.searchResults?.map((item, index) => {
      const {
        flattenedSummary: { description, headline, image },
      } = item;

      return {
        title: headline?.text,
        text: description?.content?.text,
        LinkComponent: Link,
        imagePositioning: 'aboveTitle',
        headlineHeadTagSize: 'h3',
        url: URL,
        width: '100%',
        padding: '0px',
        cardStylesOverride: {
          padding: 0,
          width: '100%',
          gap: '1rem',
        },
        shouldShowUnderlineLink: true,
      };
    }) ?? [];

  return (
    <NewswiresArticlesWrapper>
      <NewswiresLink
        href={URL}
        external={false}
        overrides={{
          stylePreset: 'link',
        }}
      >
        <NewswiresLogo src={newswiresLogo} alt={'newswires_logo'} />
      </NewswiresLink>
      <HeadlineList>
        {articlesNewswires.map((articleNewswires, index) => {
          return (
            <GridCell key={index} borderBottom className="newswires_article_headline">
              <FlexStoryCard
                brandStyleOverrides="fnl"
                layout="stacked"
                flexCardProps={articleNewswires}
                modCode={modCode}
                storyCardStyles={{ minWidth: '100%', maxWidth: '100%' }}
              />
            </GridCell>
          );
        })}
      </HeadlineList>
    </NewswiresArticlesWrapper>
  );
}

export default withOwnTheme(NewswiresWidget)({ defaults: {}, stylePresets });
