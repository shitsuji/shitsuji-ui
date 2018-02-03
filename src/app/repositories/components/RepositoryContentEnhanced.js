
import { RepositoryContent } from './RepositoryContent';
import { WithLoader, WithCopy } from '../../shared';
import { compose } from 'redux';

const enhance = compose(WithLoader, WithCopy);

export const RepositoryContentEnhanced = enhance(RepositoryContent);