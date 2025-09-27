const authService = require('../services/authService');
const { asyncHandler } = require('../middleware/errorHandler');

class AuthController {
  /**
   * Login do usuário
   * POST /api/auth/login
   */
  login = asyncHandler(async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    const result = await authService.login(email, senha);

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      data: result
    });
  });

  /**
   * Obter perfil do usuário logado
   * GET /api/auth/profile
   */
  getProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Perfil recuperado com sucesso',
      data: {
        user: req.user
      }
    });
  });

  /**
   * Atualizar perfil do usuário logado
   * PUT /api/auth/profile
   */
  updateProfile = asyncHandler(async (req, res) => {
    const updatedUser = await authService.updateUser(req.user.id, req.body, req.user);

    res.status(200).json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      data: updatedUser
    });
  });

  /**
   * Alterar senha do usuário logado
   * POST /api/auth/change-password
   */
  changePassword = asyncHandler(async (req, res) => {
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual e nova senha são obrigatórias'
      });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Nova senha deve ter pelo menos 6 caracteres'
      });
    }

    await authService.changePassword(req.user.id, senhaAtual, novaSenha, req.user);

    res.status(200).json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  });

  /**
   * Listar usuários (apenas admin master)
   * GET /api/auth/users
   */
  getUsers = asyncHandler(async (req, res) => {
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      tipoUsuario: req.query.tipoUsuario,
      search: req.query.search,
      ativo: req.query.ativo === 'true' ? true : req.query.ativo === 'false' ? false : undefined
    };

    const result = await authService.getUsers(options, req.user);

    res.status(200).json({
      success: true,
      message: 'Usuários recuperados com sucesso',
      data: result.users,
      pagination: result.pagination
    });
  });

  /**
   * Obter usuário por ID (apenas admin master)
   * GET /api/auth/users/:id
   */
  getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!req.user.canManageUsers()) {
      return res.status(403).json({
        success: false,
        message: 'Sem permissão para visualizar usuários'
      });
    }

    const user = await authService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário recuperado com sucesso',
      data: user
    });
  });

  /**
   * Criar novo usuário (apenas admin master)
   * POST /api/auth/users
   */
  createUser = asyncHandler(async (req, res) => {
    const user = await authService.createUser(req.body, req.user);

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: user
    });
  });

  /**
   * Atualizar usuário (apenas admin master)
   * PUT /api/auth/users/:id
   */
  updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await authService.updateUser(id, req.body, req.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: user
    });
  });

  /**
   * Excluir usuário (apenas admin master)
   * DELETE /api/auth/users/:id
   */
  deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleted = await authService.deleteUser(id, req.user);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário excluído com sucesso'
    });
  });

  /**
   * Alterar senha de outro usuário (apenas admin master)
   * POST /api/auth/users/:id/change-password
   */
  changeUserPassword = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { novaSenha } = req.body;

    if (!novaSenha) {
      return res.status(400).json({
        success: false,
        message: 'Nova senha é obrigatória'
      });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Nova senha deve ter pelo menos 6 caracteres'
      });
    }

    await authService.changePassword(id, null, novaSenha, req.user);

    res.status(200).json({
      success: true,
      message: 'Senha do usuário alterada com sucesso'
    });
  });

  /**
   * Obter opções de tipos de usuário
   * GET /api/auth/user-types
   */
  getUserTypes = asyncHandler(async (req, res) => {
    const { User } = require('../models');
    const types = User.getTiposUsuario();

    res.status(200).json({
      success: true,
      message: 'Tipos de usuário recuperados com sucesso',
      data: types
    });
  });

  /**
   * Verificar se existe admin master no sistema
   * GET /api/auth/check-admin-master
   */
  checkAdminMaster = asyncHandler(async (req, res) => {
    const { User } = require('../models');
    
    try {
      const adminMaster = await User.findOne({
        where: { tipoUsuario: 'admin_master' }
      });

      res.status(200).json({
        success: true,
        data: {
          hasAdminMaster: !!adminMaster
        }
      });
    } catch (error) {
      // Se houver erro de conexão com BD, assumir que não há admin master
      res.status(200).json({
        success: true,
        data: {
          hasAdminMaster: false
        }
      });
    }
  });

  /**
   * Criar primeiro admin master (apenas se não existir)
   * POST /api/auth/setup-admin-master
   */
  setupAdminMaster = asyncHandler(async (req, res) => {
    const { User } = require('../models');
    
    try {
      const adminMaster = await User.createAdminMaster(req.body);

      res.status(201).json({
        success: true,
        message: 'Administrador master criado com sucesso',
        data: adminMaster.toJSON()
      });
    } catch (error) {
      if (error.message.includes('Já existe um administrador master')) {
        return res.status(409).json({
          success: false,
          message: 'Já existe um administrador master no sistema'
        });
      }
      throw error;
    }
  });
}

module.exports = new AuthController();
