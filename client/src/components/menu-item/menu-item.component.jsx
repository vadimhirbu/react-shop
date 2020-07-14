import React from "react";
import { withRouter } from 'react-router-dom';

import { MenuItemContainer, BackgroundImageContainer, ContentContainer, TitleContainer, SubtitleContainer } from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <MenuItemContainer
    onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <BackgroundImageContainer
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    >
    </BackgroundImageContainer>
    <ContentContainer>
      <TitleContainer>{title.toUpperCase()}</TitleContainer>
      <SubtitleContainer>SHOP NOW</SubtitleContainer>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);