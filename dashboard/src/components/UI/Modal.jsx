import React from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ title, onClose, children, actions }) => {
    return createPortal(
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-start justify-center z-50 py-10"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg mx-4"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Modal Header */}
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 focus:outline-none">
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-4">
                        {children}
                    </div>

                    {/* Modal Footer */}
                    {actions && (
                        <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-x-2">
                            {actions}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default Modal;