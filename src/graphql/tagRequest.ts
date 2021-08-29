import { gql } from '@apollo/client';
import { EntireTagInput, FindTagBySlugInput, SearchTagInput, SearchTagOutput, Tag, TagStatus } from '@Models/TagModel';
import RequestService from '@Services/requestService';
import { RESPONSE_TAG, TagResolver } from './resolver/tagResolver';

const requestService = new RequestService();

const getListTagQuery = gql`
  query ListTagQuery($input: SearchTagInput!) {
    ${RESPONSE_TAG.listTags}(input: $input) {
      dataTags {
        ${TagResolver}
      }
    }
  }
`;

const getEntireTagQuery = gql`
  query Query($entireTagsInput: EntireTagInput!) {
    ${RESPONSE_TAG.entireTags}(input: $entireTagsInput) {
      slug
    }
  }
`;

const getTagBySlugQuery = gql`
  query Query($findTagBySlugInput: FindTagBySlugInput!) {
    ${RESPONSE_TAG.findTagBySlug}(input: $findTagBySlugInput) {
      ${TagResolver}
  }
}`;

export const getListTagRequest = async (input: SearchTagInput, fetchPolicy?: any): Promise<SearchTagOutput> => {
  return requestService.query(getListTagQuery, { input }, RESPONSE_TAG.listTags, fetchPolicy);
};

export const getEntireTags = async (): Promise<FindTagBySlugInput[]> => {
  return await requestService.query(
    getEntireTagQuery,
    {
      entireTagsInput: {
        status: [TagStatus.ACTIVE],
      } as EntireTagInput,
    },
    RESPONSE_TAG.entireTags
  );
};


export const getTagBySlugRequest = async (findTagBySlugInput: FindTagBySlugInput): Promise<Tag> => {
  return await requestService.query(getTagBySlugQuery, { findTagBySlugInput }, RESPONSE_TAG.findTagBySlug);
};
