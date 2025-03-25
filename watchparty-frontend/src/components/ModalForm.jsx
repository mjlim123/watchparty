import React from 'react';
import { useEffect, useState } from 'react';

export default function ModalForm({ isOpen, onClose, title, children }) {
    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
          <div className="modal-box">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{title}</h2>
              <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
                ✕
              </button>
            </div>
    
            {/* Modal Content */}
            {children}
    
            {/* Modal Footer */}
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={onClose} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </div>
        </div>
      );

}
