import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import '../models/producto.dart';
import '../models/carrito.dart';

class AsistenteVoz {
  final BuildContext context;
  final List<Producto> productos;
  final Function(Producto) onAgregarCarrito;

  late stt.SpeechToText _speech;
  bool _isListening = false;

  AsistenteVoz({
    required this.context,
    required this.productos,
    required this.onAgregarCarrito,
  }) {
    _speech = stt.SpeechToText();
  }

  Future<void> iniciarReconocimiento() async {
    bool disponible = await _speech.initialize(
      onStatus: (status) => print('status: $status'),
      onError: (error) => print('error: $error'),
    );

    if (disponible) {
      _isListening = true;
      _speech.listen(
        onResult: (val) {
          final texto = val.recognizedWords.toLowerCase();
          print("🗣️ Texto reconocido: $texto");

          if (texto.isNotEmpty) {
            _procesarComando(texto);
            _speech.stop();
            _isListening = false;
          }
        },
        listenMode: stt.ListenMode.confirmation,
        pauseFor: const Duration(seconds: 7), // Espera hasta 7 seg en silencio
        partialResults: false, // Solo lanza resultado final
      );
    } else {
      _mostrarDialogo("El reconocimiento de voz no está disponible.");
    }
  }

  void _procesarComando(String texto) {
    if (texto.startsWith("buscar")) {
      //String termino = texto.replaceFirst("buscar", "").trim();
      //_buscarProducto(termino);
      String termino = texto.replaceFirst("buscar", "").trim();
      if (termino.isEmpty) {
        _mostrarDialogo(
          "Por favor di el nombre del producto después de 'buscar'.",
        );
      } else {
        _buscarProducto(termino);
      }
    } else if (texto.startsWith("añadir")) {
      //String termino = texto.replaceFirst("añadir", "").trim();
      //_agregarProducto(termino);
      String termino = texto.replaceFirst("añadir", "").trim();
      if (termino.isEmpty) {
        _mostrarDialogo(
          "Por favor di el nombre del producto después de 'añadir'.",
        );
      } else {
        _agregarProducto(termino);
      }
    } else {
      _mostrarDialogo("Comando no reconocido. Usa 'buscar' o 'añadir'.");
    }
  }

  void _buscarProducto(String nombre) {
    final encontrados =
        productos
            .where((p) => p.nombre.toLowerCase().contains(nombre))
            .toList();

    if (encontrados.isNotEmpty) {
      _mostrarDialogo("Producto encontrado: ${encontrados.first.nombre}");
    } else {
      _mostrarDialogo("No se encontró el producto '$nombre'");
    }
  }

  void _agregarProducto(String nombre) {
    /*
    final producto = productos.firstWhere(
      (p) => p.nombre.toLowerCase().contains(nombre),
      orElse: () => null as Producto,
    );

    if (producto != null) {
      onAgregarCarrito(producto);
      _mostrarDialogo("Añadido al carrito: ${producto.nombre}");
    } else {
      _mostrarDialogo("No se encontró el producto '$nombre'");
    }
    */
    try {
      final producto = productos.firstWhere(
        (p) => p.nombre.toLowerCase().contains(nombre),
      );
      onAgregarCarrito(producto);
      _mostrarDialogo("Añadido al carrito: ${producto.nombre}");
    } catch (e) {
      _mostrarDialogo("No se encontró el producto '$nombre'");
    }
  }

  void _mostrarDialogo(String mensaje) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text("Asistente de Voz"),
            content: Text(mensaje),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text("Cerrar"),
              ),
            ],
          ),
    );
  }
}
