import React from 'react';
import { Tag } from '../../tag/tags';

describe('Tags component', () => {
  it('should return default message when no tags and no message are passed', () => {
    // default message = 'No tags to show'
    const data: string[] = [];

    expect(<Tag data={data} />).toHaveProperty('props.message', 'No tags to show');
  });

  it('should return a message when no tags are passed with specefied message', () => {
    const data: string[] = [];
    const noTagMessage = 'Nessun tag da mostrare';

    expect(<Tag data={data} noTagMessage={noTagMessage} />).toHaveProperty('props.noTagMessage', noTagMessage);
  });

  it('should return a list of tags when tags are passed', () => {
    const data: string[] = ['tag1', 'tag2', 'tag3'];

    expect(<Tag data={data} />).toHaveProperty('props.data', data);
  });

  it('should return a specefic number of tags when tags are passed with specefied number to show', () => {
    const data: string[] = ['tag1', 'tag2', 'tag3'];
    const tagsToShow = 2;

    expect(<Tag data={data} tagsToShow={tagsToShow} />).toHaveProperty('props.tagsToShow', tagsToShow);
  });
});