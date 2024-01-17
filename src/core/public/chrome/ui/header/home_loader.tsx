/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import './home_loader.scss';

import { i18n } from '@osd/i18n';
import React from 'react';
import useObservable from 'react-use/lib/useObservable';
import { Observable } from 'rxjs';

import { EuiHeaderSectionItemButton } from '@elastic/eui';
import { ChromeNavLink } from '../..';
import { ChromeBranding } from '../../chrome_service';
import { LoadingIndicator } from '../loading_indicator';
import { HomeIcon } from './home_icon';

interface Props {
  href: string;
  navLinks$: Observable<ChromeNavLink[]>;
  forceNavigation$: Observable<boolean>;
  loadingCount$: Observable<number>;
  navigateToApp: (appId: string) => void;
  branding: ChromeBranding;
}

export function HomeLoader({ href, navigateToApp, branding, ...observables }: Props) {
  const wazuhHome = '/app/wazuh';
  const loadingCount = useObservable(observables.loadingCount$, 0);
  const label = i18n.translate('core.ui.chrome.headerGlobalNav.goHomePageIconAriaLabel', {
    defaultMessage: 'Go to home page',
  });

  return (
    <EuiHeaderSectionItemButton
      className="header__homeLoaderNavButton"
      data-test-subj="homeLoader"
      href={wazuhHome}
      aria-label={label}
      title={label}
    >
      {!(loadingCount > 0) && (
        <div className="homeIconContainer">
          <HomeIcon {...branding} />
        </div>
      )}
      <div className="loaderContainer">
        <LoadingIndicator loadingCount$={observables.loadingCount$} />
      </div>
    </EuiHeaderSectionItemButton>
  );
}
