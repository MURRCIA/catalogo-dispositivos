'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useDevices } from '@/context/DeviceContext';
import { useState } from 'react';

export default function DeviceDetailPage() {
  const params = useParams();
  const deviceId = params.id as string;
  const { getDeviceById, getCommentsByDeviceId, addComment } = useDevices();
  
  const device = getDeviceById(deviceId);
  const comments = getCommentsByDeviceId(deviceId);
  
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState({
    userName: '',
    userEmail: '',
    content: '',
    rating: 5
  });

  if (!device) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Dispositivo no encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            El dispositivo que buscas no existe o ha sido eliminado.
          </p>
          <Link href="/" className="btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type: string) => {
    return type === 'smartphone' ? '📱' : '💻';
  };

  const getTypeLabel = (type: string) => {
    return type === 'smartphone' ? 'Smartphone' : 'Laptop';
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.userName.trim() || !newComment.content.trim()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    addComment({
      deviceId: device.id,
      userName: newComment.userName,
      userEmail: newComment.userEmail,
      content: newComment.content,
      rating: newComment.rating
    });

    setNewComment({
      userName: '',
      userEmail: '',
      content: '',
      rating: 5
    });
    setShowCommentForm(false);
    alert('Comentario agregado exitosamente');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              Inicio
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-900 dark:text-gray-100">{device.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - Información del dispositivo */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header del dispositivo */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">{getTypeIcon(device.type)}</span>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {device.brand}
                      </p>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {device.name}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                      {getTypeLabel(device.type)}
                    </span>
                    <span>Lanzado: {formatDate(device.releaseDate)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(device.price)}
                  </div>
                  <div className="flex items-center justify-end mt-2">
                    {renderStars(Math.round(device.rating))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      ({device.rating}/5)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Descripción
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {device.description}
              </p>
            </div>

            {/* Reseña */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Reseña Detallada
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {device.review}
              </p>
            </div>

            {/* Comentarios */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Comentarios ({comments.length})
                </h2>
                <button
                  onClick={() => setShowCommentForm(!showCommentForm)}
                  className="btn-primary"
                >
                  {showCommentForm ? 'Cancelar' : 'Agregar Comentario'}
                </button>
              </div>

              {/* Formulario de nuevo comentario */}
              {showCommentForm && (
                <form onSubmit={handleCommentSubmit} className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Agregar nuevo comentario
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="form-label">Nombre *</label>
                      <input
                        type="text"
                        value={newComment.userName}
                        onChange={(e) => setNewComment({...newComment, userName: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        value={newComment.userEmail}
                        onChange={(e) => setNewComment({...newComment, userEmail: e.target.value})}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Calificación</label>
                    <select
                      value={newComment.rating}
                      onChange={(e) => setNewComment({...newComment, rating: parseInt(e.target.value)})}
                      className="form-input"
                    >
                      <option value={5}>5 estrellas - Excelente</option>
                      <option value={4}>4 estrellas - Muy bueno</option>
                      <option value={3}>3 estrellas - Bueno</option>
                      <option value={2}>2 estrellas - Regular</option>
                      <option value={1}>1 estrella - Malo</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Comentario *</label>
                    <textarea
                      value={newComment.content}
                      onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                      rows={4}
                      className="form-input"
                      placeholder="Comparte tu experiencia con este dispositivo..."
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary">
                      Publicar Comentario
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowCommentForm(false)}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}

              {/* Lista de comentarios */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 dark:border-gray-600 pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {comment.userName}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(comment.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {renderStars(comment.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl opacity-50 mb-4">💬</div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Aún no hay comentarios. ¡Sé el primero en compartir tu opinión!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna lateral - Especificaciones */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Especificaciones
              </h2>
              <div className="space-y-4">
                {device.specs.processor && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Procesador:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">
                      {device.specs.processor}
                    </span>
                  </div>
                )}
                {device.specs.ram && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">RAM:</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {device.specs.ram}
                    </span>
                  </div>
                )}
                {device.specs.storage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Almacenamiento:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">
                      {device.specs.storage}
                    </span>
                  </div>
                )}
                {device.specs.operatingSystem && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sistema:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">
                      {device.specs.operatingSystem}
                    </span>
                  </div>
                )}
                {device.specs.screenSize && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Pantalla:</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {device.specs.screenSize}
                    </span>
                  </div>
                )}
                {device.specs.camera && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Cámara:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">
                      {device.specs.camera}
                    </span>
                  </div>
                )}
                {device.specs.battery && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Batería:</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {device.specs.battery}
                    </span>
                  </div>
                )}
                {device.specs.graphics && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Gráficos:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">
                      {device.specs.graphics}
                    </span>
                  </div>
                )}
                {device.specs.weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Peso:</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {device.specs.weight}
                    </span>
                  </div>
                )}
                {device.specs.displayType && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Display:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">
                      {device.specs.displayType}
                    </span>
                  </div>
                )}
                {device.specs.ports && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Puertos:</span>
                    <ul className="mt-2 space-y-1">
                      {device.specs.ports.map((port, index) => (
                        <li key={index} className="text-gray-900 dark:text-gray-100 text-sm">
                          • {port}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Botón de volver */}
            <Link href="/" className="block w-full btn-secondary text-center">
              ← Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
