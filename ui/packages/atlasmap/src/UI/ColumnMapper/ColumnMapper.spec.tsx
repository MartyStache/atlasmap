/*
    Copyright (C) 2017 Red Hat, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
import { act, render } from '@testing-library/react';
import { example } from './ColumnMapper.stories';

describe('ColumnMapper tests', () => {
  test('should render', async () => {
    const { getByText, findByTestId } = render(example());
    getByText('Source');
    getByText('Mapping');
    getByText('Target');
    // lines are rendered after a DOM layout event
    await act(async () => {
      await findByTestId('Fiz:Mapping 1');
      await findByTestId('Mapping 1:Foo');
      await findByTestId('Foo bar:Mapping 2');
      await findByTestId('Mapping 2:Baz');
    });
  });
});
