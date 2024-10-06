import { Fragment } from 'react';
import { Transition } from '@headlessui/react';

const Loader = ({ show = true }) => {
  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transform transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transform transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </Transition>
  );
};

export default Loader;
