/*
 * Copyright 2018 ThoughtWorks, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Stream = require('mithril/Stream');

const VM = () => {
  const dropdownStates = {};

  const viewModel = {
    dropdown: {

      create(dropDownName) {
        if (!dropdownStates[dropDownName]) {
          dropdownStates[dropDownName] = Stream(false);
        }

        return dropdownStates[dropDownName];
      },

      hide(dropDownName) {
        viewModel.dropdown.create(dropDownName)(false);
      },

      hideAllDropDowns() {
        for (const item in dropdownStates) {
          dropdownStates[item](false);
        }
      },

      hideOtherDropdowns(dropDownName) {
        for (const item in dropdownStates) {
          if (item !== dropDownName) {
            this.hide(item);
          }
        }
      },

      toggleDropDownState(dropDownName) {
        dropdownStates[dropDownName](!dropdownStates[dropDownName]());
        this.hideOtherDropdowns(dropDownName);
      },

      isDropDownOpen(dropDownName) {
        return this.create(dropDownName)();
      }
    }
  };
  return viewModel;
};

module.exports = VM;