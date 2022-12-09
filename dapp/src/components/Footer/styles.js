import styled from 'styled-components'

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  font-size: 18px;
  .main-frame {
    max-width: 833px;
    min-width: 400px;
  }
`;

export const MarginDiv = styled.div`
margin-right: 10px;
margin-top: 10px;
`;

export const SocialsFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  flex-wrap: wrap;
`;
export const SocialFlex = styled.div`
  cursor: pointer;
  display: flex;
  background-color: #30392c;
  border-radius: 40px;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
  transition: 0.4s ease-in-out;
  padding: 10px;
  flex-gap: 6px;
  gap: 6px;

  &:hover {
    background-color: #80392c;
  }
`;
export const SocialBox = styled.div`
  max-width: 140px;
  font-size: 12px;
  text-decoration: underline;
`;

