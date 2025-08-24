'use client';

import { useDevices } from '@/context/DeviceContext';
import { useState } from 'react';
import { Device, DeviceSpecs } from '@/types';

export default function AdminPage() {
  const { devices, addDevice, updateDevice, deleteDevice } = useDevices();
  const [showForm, setShowForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [formData, setFormData] = useState<Omit<Device, 'id'>>({
    name: '',
    brand: '',
    type: 'smartphone',
    price: 0,
    image: '',
    releaseDate: '',
    rating: 5,
    description: '',
    review: '',
    specs: {}
  });

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      type: 'smartphone',
      price: 0,
      image: '',
      releaseDate: '',
      rating: 5,
      description: '',
      review: '',
      specs: {}
    });
    setEditingDevice(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.brand.trim() || !formData.description.trim()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (editingDevice) {
      updateDevice(editingDevice.id, formData);
      alert('Dispositivo actualizado exitosamente');
    } else {
      addDevice(formData);
      alert('Dispositivo agregado exitosamente');
    }

    resetForm();
  };

  const handleEdit = (device: Device) => {
    setFormData({
      name: device.name,
      brand: device.brand,
      type: device.type,
      price: device.price,
      image: device.image,
      releaseDate: device.releaseDate,
      rating: device.rating,
      description: device.description,
      review: device.review,
      specs: device.specs
    });
    setEditingDevice(device);
    setShowForm(true);
  };

  const handleDelete = (device: Device) => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${device.name}"?`)) {
      deleteDevice(device.id);
      alert('Dispositivo eliminado exitosamente');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const getTypeIcon = (type: string) => {
    return type === 'smartphone' ? '📱' : '💻';
  };

  const getTypeLabel = (type: string) => {
    return type === 'smartphone' ? 'Smartphone' : 'Laptop';
  };

  const updateSpecs = (key: keyof DeviceSpecs, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [key]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Panel de Administración
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gestiona el catálogo de dispositivos
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              + Agregar Dispositivo
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📊</div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {devices.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Total Dispositivos
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📱</div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {devices.filter(d => d.type === 'smartphone').length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Smartphones
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">💻</div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {devices.filter(d => d.type === 'laptop').length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Laptops
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {editingDevice ? 'Editar Dispositivo' : 'Agregar Nuevo Dispositivo'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información básica */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Nombre del dispositivo *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Marca *</label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Tipo *</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value as 'smartphone' | 'laptop'})}
                        className="form-input"
                        required
                      >
                        <option value="smartphone">Smartphone</option>
                        <option value="laptop">Laptop</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Precio (EUR) *</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                        className="form-input"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Fecha de lanzamiento *</label>
                      <input
                        type="date"
                        value={formData.releaseDate}
                        onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Rating (1-5) *</label>
                      <input
                        type="number"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value) || 5})}
                        className="form-input"
                        min="1"
                        max="5"
                        step="0.1"
                        required
                      />
                    </div>
                  </div>

                  {/* Descripción y reseña */}
                  <div>
                    <label className="form-label">Descripción *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Reseña detallada</label>
                    <textarea
                      value={formData.review}
                      onChange={(e) => setFormData({...formData, review: e.target.value})}
                      rows={4}
                      className="form-input"
                    />
                  </div>

                  {/* Especificaciones */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Especificaciones
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Procesador</label>
                        <input
                          type="text"
                          value={formData.specs.processor || ''}
                          onChange={(e) => updateSpecs('processor', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">RAM</label>
                        <input
                          type="text"
                          value={formData.specs.ram || ''}
                          onChange={(e) => updateSpecs('ram', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Almacenamiento</label>
                        <input
                          type="text"
                          value={formData.specs.storage || ''}
                          onChange={(e) => updateSpecs('storage', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Sistema Operativo</label>
                        <input
                          type="text"
                          value={formData.specs.operatingSystem || ''}
                          onChange={(e) => updateSpecs('operatingSystem', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      
                      {formData.type === 'smartphone' && (
                        <>
                          <div>
                            <label className="form-label">Tamaño de pantalla</label>
                            <input
                              type="text"
                              value={formData.specs.screenSize || ''}
                              onChange={(e) => updateSpecs('screenSize', e.target.value)}
                              className="form-input"
                            />
                          </div>
                          <div>
                            <label className="form-label">Cámara</label>
                            <input
                              type="text"
                              value={formData.specs.camera || ''}
                              onChange={(e) => updateSpecs('camera', e.target.value)}
                              className="form-input"
                            />
                          </div>
                          <div>
                            <label className="form-label">Batería</label>
                            <input
                              type="text"
                              value={formData.specs.battery || ''}
                              onChange={(e) => updateSpecs('battery', e.target.value)}
                              className="form-input"
                            />
                          </div>
                        </>
                      )}
                      
                      {formData.type === 'laptop' && (
                        <>
                          <div>
                            <label className="form-label">Gráficos</label>
                            <input
                              type="text"
                              value={formData.specs.graphics || ''}
                              onChange={(e) => updateSpecs('graphics', e.target.value)}
                              className="form-input"
                            />
                          </div>
                          <div>
                            <label className="form-label">Peso</label>
                            <input
                              type="text"
                              value={formData.specs.weight || ''}
                              onChange={(e) => updateSpecs('weight', e.target.value)}
                              className="form-input"
                            />
                          </div>
                          <div>
                            <label className="form-label">Tipo de pantalla</label>
                            <input
                              type="text"
                              value={formData.specs.displayType || ''}
                              onChange={(e) => updateSpecs('displayType', e.target.value)}
                              className="form-input"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      {editingDevice ? 'Actualizar' : 'Agregar'} Dispositivo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Lista de dispositivos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Dispositivos en el catálogo
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Dispositivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {devices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getTypeIcon(device.type)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {device.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {device.brand}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {getTypeLabel(device.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatPrice(device.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          {device.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(device)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(device)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
