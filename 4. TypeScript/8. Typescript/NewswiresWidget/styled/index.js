import styled from '@emotion/styled';
import { Block, TextBlock, Image, getTypographyPresetFromTheme, LinkStandalone } from 'newskit';

const NewswiresArticlesWrapper = styled(Block)`
  width: 100%;
`;

const NewswiresLink = styled(LinkStandalone)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NewswiresLogo = styled(Image)`
  width: 300px;
  height: ${({ theme }) => theme.sizing.sizing080};
`;

const HeadlineList = styled(Block)``;

export { NewswiresArticlesWrapper, NewswiresLogo, NewswiresLink, HeadlineList };
