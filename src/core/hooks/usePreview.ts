import { useContext } from 'react';
import { previewContext } from '../../components/auth/PreviewProvider';

const usePreview = (): [boolean, (preview: boolean) => Promise<boolean>] => {
  const { preview, setPreview } = useContext(previewContext);

  return [preview, setPreview];
};
export default usePreview;
