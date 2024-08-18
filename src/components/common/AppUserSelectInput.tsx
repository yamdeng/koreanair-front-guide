import { useState } from 'react';
import UserSelectModal from '../modal/UserSelectModal';
import UserSelectWithOrgTreeModal from '../modal/UserSelectWithOrgTreeModal';
import AppSearchInput from './AppSearchInput';

function AppUserSelectInput(props) {
  const { value, onChange, withOrgTree = false } = props;
  const [isUserSelectModalopen, setIsUserSelectModalopen] = useState(false);

  const clearHandler = () => {
    onChange(null);
  };

  const handleOrgSelectModal = (selectedValue) => {
    onChange(selectedValue, selectedValue ? selectedValue.userId : '');
    setIsUserSelectModalopen(false);
  };

  const searchInputValue = value ? value.nameKor : '';

  return (
    <>
      <AppSearchInput
        {...props}
        disabled
        search={() => setIsUserSelectModalopen(true)}
        clearHandler={clearHandler}
        value={searchInputValue}
      />
      {withOrgTree ? (
        <UserSelectWithOrgTreeModal
          isOpen={isUserSelectModalopen}
          closeModal={() => setIsUserSelectModalopen(false)}
          isMultiple={false}
          ok={handleOrgSelectModal}
        />
      ) : (
        <UserSelectModal
          isOpen={isUserSelectModalopen}
          closeModal={() => setIsUserSelectModalopen(false)}
          isMultiple={false}
          ok={handleOrgSelectModal}
        />
      )}
    </>
  );
}

export default AppUserSelectInput;
