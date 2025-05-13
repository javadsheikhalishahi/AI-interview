import { Dialog, Transition } from '@headlessui/react';
import { Database } from 'lucide-react';
import { Fragment } from 'react';
import { toast } from 'sonner';

export default function ContactUsModal2({ isOpen, setIsOpen }) {
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form[0].value;
    const email = form[1].value;
    const message = form[2].value;
  
    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
  
      if (!res.ok) throw new Error('Failed to send message');
  
      toast.success('Message sent successfully!');
      closeModal();
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" leave="ease-in duration-200"
          enterFrom="opacity-0" enterTo="opacity-100"
          leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" leave="ease-in duration-200"
              enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="h3" className="flex items-center gap-2 text-lg font-medium text-gray-900">
                 <Database className='w-6 h-6 text-emerald-500'/> Request Data
                </Dialog.Title>
                <hr className='mt-2 bg-black border border-black'/>
                <p className="mt-2 text-sm text-gray-800">
                  Please contact our team for a Request Data. Fill in your details and we’ll get back to you soon.
                </p>
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-md border border-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full rounded-md border border-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    placeholder="Message"
                    className="w-full rounded-md border border-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:scale-105"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="font-semibold px-4 py-2 bg-emerald-500 text-black rounded-md cursor-pointer hover:scale-105"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
