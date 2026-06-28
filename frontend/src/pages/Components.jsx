import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Button, Input, Modal, Loader, showToast } from '../components/ui'
import Toast from '../components/ui/Toast'

export default function Components() {
  const [modalOpen, setModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <>
      <Navbar />
      <Toast />
      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-10">

        <h1 className="text-3xl font-display font-bold text-green-900 dark:text-white">
          Component Library
        </h1>

        {/* Buttons */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </section>

        {/* Input */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">Input</h2>
          <div className="max-w-sm flex flex-col gap-3">
            <Input
              label="Crop Name"
              placeholder="e.g. Potato"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="Error Example"
              placeholder="Enter value"
              error="This field is required"
            />
          </div>
        </section>

        {/* Modal */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">Modal</h2>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Price Alert"
          >
            <p className="text-gray-600">Potato prices have risen 11% this week in Rudraprayag mandi.</p>
          </Modal>
        </section>

        {/* Toast */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">Toast</h2>
          <div className="flex gap-3">
            <Button onClick={() => showToast('Price updated!', 'success')}>
              Success Toast
            </Button>
            <Button variant="outline" onClick={() => showToast('Something went wrong', 'error')}>
              Error Toast
            </Button>
          </div>
        </section>

        {/* Loader */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">Loader</h2>
          <div className="flex gap-6 items-center">
            <Loader size="sm" />
            <Loader size="md" />
            <Loader size="lg" />
          </div>
        </section>

      </div>
    </>
  )
}