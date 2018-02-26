import styled from 'styled-components';

/*

Usage

  1. props:
    type="file"
    onChange={function}
    accept="image/png,image/gif,image/jpeg"
    
  2. parent div must be 'position: relative'

*/

const ImageFile = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
`;

export default ImageFile;
